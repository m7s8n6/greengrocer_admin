<?php

namespace App\Services;

use App\Events\DeliveryBoyOfferWithdrawn;
use App\Events\DeliveryBoyOrderOffered;
use App\Helpers\CommonHelper;
use App\Helpers\FirebaseHelper;
use App\Models\AdminToken;
use App\Models\DeliveryAssignmentAttempt;
use App\Models\DeliveryBoy;
use App\Models\ModuleDeliverySetting;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatus;
use App\Models\OrderStatusList;
use App\Models\Seller;
use App\Models\UserAddress;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AutoAssignDeliveryBoyService
{
    /**
     * Order status that starts the hunt for a driver - fixed in code, not an admin
     * setting (per explicit request). OrderStatusList::$shipped (4).
     * Quick Delivery (slot_type 'express') orders start earlier, at Received - see
     * triggerStatusesFor().
     */
    private const TRIGGER_STATUS = 4;

    /**
     * Orders carry a module scope that follows the current request's X-Module-Id (default 1). The
     * payment webhooks and the timeout sweep have no such header, so an order of another module
     * would not be found - and auto-assign would silently do nothing. Look it up across modules.
     */
    private static function findOrder($id): ?Order
    {
        return Order::withoutGlobalScope('module')->find($id);
    }

    /**
     * Statuses at which this order may start a driver hunt. Every order starts at Shipped (4).
     * A Quick Delivery order also starts at Received (2); if nobody accepts that round, reaching
     * Shipped starts a second one.
     */
    private static function triggerStatusesFor(Order $order): array
    {
        if ($order->slot_type === OrderStatusList::$slotTypeExpress) {
            return [OrderStatusList::$received, self::TRIGGER_STATUS];
        }

        return [self::TRIGGER_STATUS];
    }

    /**
     * Quick Delivery orders get a second hunt at Shipped, after the one at Received. Attempts made
     * before the order reached Shipped belong to the first hunt, so round counting, the time cap
     * and the "already asked" list restart from the moment the order reached Shipped.
     * Null = no cut-off (every other case: all attempts count, exactly as before).
     */
    private static function stageStart(Order $order): ?\Carbon\Carbon
    {
        if ($order->slot_type !== OrderStatusList::$slotTypeExpress
            || (int) $order->active_status !== self::TRIGGER_STATUS) {
            return null;
        }

        $reachedShippedAt = OrderStatus::where('order_id', $order->id)
            ->where('order_item_id', 0)
            ->where('status', OrderStatusList::$shipped)
            ->value('created_at');

        return $reachedShippedAt ? \Carbon\Carbon::parse($reachedShippedAt) : null;
    }

    /** Attempts of the current hunt only (see stageStart()). */
    private static function currentStageAttempts(Order $order)
    {
        $stageStart = self::stageStart($order);

        return DeliveryAssignmentAttempt::where('order_id', $order->id)
            ->when($stageStart, fn ($q) => $q->where('offered_at', '>=', $stageStart));
    }

    /**
     * Called from Order::boot()'s saved hook. No-op unless every one of these holds:
     * module has auto_assign_enabled, order just reached that module's trigger status,
     * order has no delivery_boy_id yet, order is a single-seller order, order isn't
     * self-pickup/POS.
     */
    public static function maybeStart(int $orderId): void
    {
        $order = self::findOrder($orderId);
        if (!$order) {
            return;
        }

        // Cancelled / returned: any offer still out to drivers is no longer valid.
        if (!self::isAssignable($order)) {
            self::withdrawOtherOpenAttempts($order->id, null);
            return;
        }

        if (!empty($order->delivery_boy_id)) {
            return;
        }

        if (in_array((int) $order->active_status, [
            OrderStatusList::$selfPickupPending,
            OrderStatusList::$selfPickupReady,
            OrderStatusList::$selfPickupPicked,
        ], true)) {
            return; // self-pickup never enters this path (plan §8)
        }

        $settings = ModuleDeliverySetting::forModule($order->module_id);
        if (!$settings || !$settings->auto_assign_enabled) {
            return; // manual-only for this module, exactly today's behaviour
        }

        if (!in_array((int) $order->active_status, self::triggerStatusesFor($order), true)) {
            return;
        }

        // Already has open attempts for this exact status change (e.g. a duplicate
        // ->save() firing the same hook twice) - don't double-start.
        if (DeliveryAssignmentAttempt::where('order_id', $order->id)
            ->where('status', DeliveryAssignmentAttempt::$statusOffered)
            ->exists()) {
            return;
        }

        // Quick Delivery orders can start twice (Received, then Shipped): each status only starts
        // its hunt once, so a repeated save at the same status doesn't start another.
        if ($order->slot_type === OrderStatusList::$slotTypeExpress
            && self::currentStageAttempts($order)->exists()) {
            return;
        }

        $sellerIds = OrderItem::where('order_id', $order->id)->distinct()->pluck('seller_id');
        if ($sellerIds->count() !== 1) {
            Log::info("[AutoAssign] order #{$order->id} spans " . $sellerIds->count() . " sellers - v1 only handles single-seller orders, staying manual.");
            return;
        }

        $seller = Seller::find($sellerIds->first());
        if (!$seller) {
            return;
        }

        self::startRound($order, $seller, $settings, 1, []);
    }

    /**
     * Driver tapped Accept or Reject, or the timeout sweep expired an offer. Handles
     * the win/backfill/round-advance/exhaustion logic. Always re-fetches the order
     * fresh first (plan §7/§8 cancellation-safety note).
     */
    public static function handleResponse(int $attemptId, string $action): array
    {
        return DB::transaction(function () use ($attemptId, $action) {
            $attempt = DeliveryAssignmentAttempt::where('id', $attemptId)->lockForUpdate()->first();
            if (!$attempt || $attempt->status !== DeliveryAssignmentAttempt::$statusOffered) {
                return ['status' => 0, 'message' => 'offer_no_longer_available'];
            }

            $order = self::findOrder($attempt->order_id);
            if (!$order || !self::isAssignable($order)) {
                $attempt->status = DeliveryAssignmentAttempt::$statusWithdrawn;
                $attempt->responded_at = now();
                $attempt->save();
                return ['status' => 0, 'message' => 'order_no_longer_available'];
            }

            if ($action === 'accept') {
                if (!empty($order->delivery_boy_id)) {
                    // Someone else already won it - lose gracefully.
                    $attempt->status = DeliveryAssignmentAttempt::$statusWithdrawn;
                    $attempt->responded_at = now();
                    $attempt->save();
                    return ['status' => 0, 'message' => 'offer_already_taken'];
                }

                // Atomic conditional write - whichever concurrent accept loses this
                // updates 0 rows.
                // Unassigned orders store delivery_boy_id as 0 (not NULL), so match both.
                $locked = Order::where('id', $order->id)
                    ->where(fn ($q) => $q->whereNull('delivery_boy_id')->orWhere('delivery_boy_id', 0))
                    ->update([
                    'delivery_boy_id' => $attempt->delivery_boy_id,
                ]);

                if ($locked !== 1) {
                    $attempt->status = DeliveryAssignmentAttempt::$statusWithdrawn;
                    $attempt->responded_at = now();
                    $attempt->save();
                    return ['status' => 0, 'message' => 'offer_already_taken'];
                }

                $order->refresh();
                self::applyAssignmentSideEffects($order);

                $attempt->status = DeliveryAssignmentAttempt::$statusAccepted;
                $attempt->responded_at = now();
                $attempt->save();

                self::withdrawOtherOpenAttempts($order->id, $attempt->id);

                return ['status' => 1, 'message' => 'delivery_boy_assigned_successfully_for_this_order'];
            }

            // reject
            $attempt->status = DeliveryAssignmentAttempt::$statusRejected;
            $attempt->responded_at = now();
            $attempt->save();

            dispatch(function () use ($order) {
                try {
                    self::advance($order->id);
                } catch (\Throwable $e) {
                    Log::error('[AutoAssign] advance() after reject failed: ' . $e->getMessage());
                }
            })->afterResponse();

            return ['status' => 1, 'message' => 'offer_rejected'];
        });
    }

    /**
     * Same sweep as the scheduled command, but triggered by a driver's own offer polling, at most
     * once every 10 seconds. Timeouts and the next round then no longer depend on the server's
     * every-minute cron actually running; when cron does run, both are harmless together because
     * an offer is only ever expired once.
     */
    public static function sweepIfDue(): void
    {
        if (!\Illuminate\Support\Facades\Cache::add('auto_assign_sweep_ran', 1, now()->addSeconds(10))) {
            return;
        }

        try {
            self::sweepExpiredOffers();
        } catch (\Throwable $e) {
            Log::error('[AutoAssign] sweepIfDue failed: ' . $e->getMessage());
        }
    }

    /**
     * Timeout sweep (see App\Console\Commands\SweepAutoAssignTimeouts). Expires any
     * 'offered' attempt past its module's response_timeout_seconds, then advances.
     */
    public static function sweepExpiredOffers(): void
    {
        $expired = DeliveryAssignmentAttempt::where('status', DeliveryAssignmentAttempt::$statusOffered)
            ->where('offered_at', '<=', now()->subSeconds(1)) // real cutoff applied per-row below
            ->get();

        $orderIdsToAdvance = [];

        foreach ($expired as $attempt) {
            $order = self::findOrder($attempt->order_id);
            if (!$order) {
                continue;
            }
            $settings = ModuleDeliverySetting::forModule($order->module_id);
            $timeoutSeconds = $settings->response_timeout_seconds ?? 60;

            if ($attempt->offered_at && $attempt->offered_at->diffInSeconds(now()) >= $timeoutSeconds) {
                $attempt->status = DeliveryAssignmentAttempt::$statusTimeout;
                $attempt->responded_at = now();
                $attempt->save();
                $orderIdsToAdvance[$attempt->order_id] = true;
                Log::info("[AutoAssign] offer timed out: order #{$attempt->order_id}, driver #{$attempt->delivery_boy_id}, round {$attempt->round_number}.");
            }
        }

        foreach (array_keys($orderIdsToAdvance) as $orderId) {
            try {
                self::advance((int) $orderId);
            } catch (\Throwable $e) {
                Log::error("[AutoAssign] advance() during timeout sweep failed for order #{$orderId}: " . $e->getMessage());
            }
        }
    }

    /**
     * Central "what happens next" step after a reject/timeout: backfill an open slot
     * from the current round's remaining candidates, or start a new round, or - once
     * max_rounds/total_wait_cap is hit - stop and notify.
     */
    private static function advance(int $orderId): void
    {
        $order = self::findOrder($orderId);
        if (!$order || !self::isAssignable($order) || !empty($order->delivery_boy_id)) {
            self::withdrawOtherOpenAttempts($orderId, null);
            return;
        }

        $settings = ModuleDeliverySetting::forModule($order->module_id);
        if (!$settings || !$settings->auto_assign_enabled) {
            return;
        }

        $sellerIds = OrderItem::where('order_id', $order->id)->distinct()->pluck('seller_id');
        if ($sellerIds->count() !== 1) {
            return;
        }
        $seller = Seller::find($sellerIds->first());
        if (!$seller) {
            return;
        }

        $openCount = DeliveryAssignmentAttempt::where('order_id', $orderId)
            ->where('status', DeliveryAssignmentAttempt::$statusOffered)
            ->count();

        if ($openCount > 0) {
            return; // this round's offers are still out to everyone, nothing to do yet
        }

        $lastAttempt = self::currentStageAttempts($order)->orderByDesc('round_number')->first();
        $currentRound = $lastAttempt->round_number ?? 0;

        // No open offers left (everyone in the round rejected/timed out) - decide
        // whether to start a fresh round or give up.
        $firstOfferedAt = self::currentStageAttempts($order)->min('offered_at');
       // $elapsedSeconds = $firstOfferedAt ? now()->diffInSeconds(\Carbon\Carbon::parse($firstOfferedAt)) : 0;
        $elapsedSeconds = $firstOfferedAt ? abs((int) now()->diffInSeconds(\Carbon\Carbon::parse($firstOfferedAt))) : 0;

        if ($currentRound >= $settings->max_rounds || $elapsedSeconds >= $settings->total_wait_cap_seconds) {
            Log::info("[AutoAssign] order #{$orderId}: no further round - round {$currentRound}/{$settings->max_rounds}, {$elapsedSeconds}s of {$settings->total_wait_cap_seconds}s cap used.");
            self::notifyNeedsManualAssignment($order);
            return;
        }

        // Round 1 is offered to every eligible driver, so if timed-out drivers were also left out
        // there would be nobody to ask in round 2 and no further round could ever start. Only a
        // driver who answered (accepted / explicitly rejected) is skipped; one who simply did not
        // respond in time is offered the order again in the next round.
        $excludeIds = self::currentStageAttempts($order)
            ->whereIn('status', [DeliveryAssignmentAttempt::$statusAccepted, DeliveryAssignmentAttempt::$statusRejected])
            ->pluck('delivery_boy_id')
            ->all();

        Log::info("[AutoAssign] order #{$orderId}: starting round " . ($currentRound + 1) . ', skipping driver(s) [' . implode(',', $excludeIds) . '].');
        self::startRound($order, $seller, $settings, $currentRound + 1, $excludeIds);
    }

    /**
     * Broadcasts to every eligible on-duty driver at once - no cap on how many get the
     * offer (per explicit request: "all active driver need to receive message and
     * first accept wins"). Naturally limited only by how many candidates actually
     * exist in the pool.
     */
    private static function startRound(Order $order, Seller $seller, ModuleDeliverySetting $settings, int $round, array $excludeIds): void
    {
        $candidates = self::rankCandidates($seller, $settings, $excludeIds);

        if ($candidates->isEmpty()) {
            Log::info("[AutoAssign] order #{$order->id}: round {$round} has no eligible on-duty driver to offer to.");
            self::notifyNeedsManualAssignment($order);
            return;
        }

        self::offerToCandidates($order, $candidates, $round);
    }

    /**
     * Builds the ranked candidate pool for one seller's single-seller order.
     * See class docblock for the v1 scope cuts (haversine, no cross-pool fallback).
     */
    private static function rankCandidates(Seller $seller, ModuleDeliverySetting $settings, array $excludeIds = [])
    {
        // Which pool this order draws from is decided entirely by the seller's own
        // delivery_boy_source (admin-set at registration or via Edit Seller) - no
        // separate module-level gate anymore, admin already has full per-seller control.
        $useOwnFleet = $seller->usesOwnFleet();

        // sellers.city_id is a comma-separated list; a driver qualifies when they serve any of the
        // seller's cities (delivery_boy_cities, or the legacy single delivery_boys.city_id).
        $sellerCityIds = array_values(array_filter(array_map('intval', explode(',', (string) $seller->city_id))));

        $base = DeliveryBoy::where('status', 1)
            ->where(function ($q) use ($sellerCityIds) {
                foreach ($sellerCityIds as $i => $cid) {
                    $i === 0 ? $q->servingCity($cid) : $q->orWhere(fn ($qq) => $qq->servingCity($cid));
                }
                if (empty($sellerCityIds)) {
                    $q->whereRaw('1 = 0');
                }
            })
            ->when($useOwnFleet, fn ($q) => $q->where('seller_id', $seller->id))
            ->when(!$useOwnFleet, fn ($q) => $q->whereNull('seller_id'))
            ->when(!empty($excludeIds), fn ($q) => $q->whereNotIn('id', $excludeIds));

        $online = (clone $base)->where('is_online', true)->get();

        // Degraded fallback: drop the is_online requirement, but never cross the
        // shared/own pool boundary chosen above (§2b's still-open question resolved to
        // "no cross-pool fallback" here, see class docblock).
        $pool = $online->isNotEmpty() ? $online : (clone $base)->get();

        $pickupLat = self::toFloatOrNull($seller->pickup_latitude);
        $pickupLng = self::toFloatOrNull($seller->pickup_longitude);
        $hasPickupCoords = $pickupLat !== null && $pickupLng !== null;

        $staleCutoff = now()->subMinutes($settings->location_staleness_minutes ?? 10);

        // No radius/max-distance cutoff here - city selection already excludes an
        // out-of-service-area order before it ever reaches auto-assign (per explicit
        // request: that check already exists elsewhere, this would be a redundant
        // second gate). Distance below is used only to rank nearest-first, never to
        // reject a candidate.
        $ranked = $pool->map(function (DeliveryBoy $driver) use ($pickupLat, $pickupLng, $hasPickupCoords, $staleCutoff) {
            $driverLat = self::toFloatOrNull($driver->current_latitude);
            $driverLng = self::toFloatOrNull($driver->current_longitude);
            $locationFresh = $driver->location_updated_at && $driver->location_updated_at->greaterThanOrEqualTo($staleCutoff);

            $distanceKm = null;
            if ($hasPickupCoords && $driverLat !== null && $driverLng !== null && $locationFresh) {
                $distanceKm = self::haversineKm($pickupLat, $pickupLng, $driverLat, $driverLng);
            }

            return [
                'driver' => $driver,
                'distance_km' => $distanceKm,
                'pending_count' => $driver->pending_order_count,
            ];
        })->filter(function ($row) use ($settings, $hasPickupCoords) {
            if ($row === null) {
                return false;
            }
            // Only enforce max_concurrent_orders as a hard cutoff, not a ranking tie-break.
            // 0 = unlimited: a driver gets the offer however many open orders they already have.
            if ((int) $settings->max_concurrent_orders === 0) {
                return true;
            }
            return $row['pending_count'] < $settings->max_concurrent_orders;
        });

        return $ranked->sort(function ($a, $b) {
            if ($a['distance_km'] !== null && $b['distance_km'] !== null) {
                return $a['distance_km'] <=> $b['distance_km'] ?: $a['pending_count'] <=> $b['pending_count'];
            }
            if ($a['distance_km'] !== null) {
                return -1; // known distance beats unknown
            }
            if ($b['distance_km'] !== null) {
                return 1;
            }
            return $a['pending_count'] <=> $b['pending_count'];
        })->values();
    }

    private static function offerToCandidates(Order $order, $rankedCandidates, int $round): void
    {
        foreach ($rankedCandidates as $row) {
            $driver = $row['driver'];

            DeliveryAssignmentAttempt::create([
                'order_id' => $order->id,
                'delivery_boy_id' => $driver->id,
                'round_number' => $round,
                'status' => DeliveryAssignmentAttempt::$statusOffered,
                'distance_km' => $row['distance_km'],
                'offered_at' => now(),
            ]);

            self::pushOffer($driver, $order, $row['distance_km']);
        }
    }

    private static function pushOffer(DeliveryBoy $driver, Order $order, ?float $distanceKm): void
    {
        $settings = ModuleDeliverySetting::forModule($order->module_id);
        $timeoutSeconds = $settings->response_timeout_seconds ?? 60;

        try {
            if ($driver->admin_id) {
                $tokens = AdminToken::where('user_id', $driver->admin_id)->where('type', 'Delivery Boy')->get();
                if ($tokens->isNotEmpty()) {
                    $fcmMsg = [
                        'click_action' => 'FLUTTER_NOTIFICATION_CLICK',
                        'title' => 'New order offer',
                        'message' => 'Order #' . $order->id . ' is available nearby',
                        'body' => 'Order #' . $order->id . ' is available nearby',
                        'type' => 'order_offer',
                        'id' => (string) $order->id,
                        'order_id' => (string) $order->id,
                        'response_timeout_seconds' => (string) $timeoutSeconds,
                    ];
                    $notification = [
                        'title' => 'New order offer',
                        'body' => 'Order #' . $order->id . ' is available nearby',
                    ];
                    FirebaseHelper::sendBulk($tokens, $fcmMsg, $notification, AdminToken::class);
                }
            }
        } catch (\Throwable $e) {
            Log::error('[AutoAssign] FCM push for order offer failed: ' . $e->getMessage());
        }

        try {
            broadcast(new DeliveryBoyOrderOffered($driver->id, $order->id, $distanceKm ?? 0, $timeoutSeconds))->toOthers();
        } catch (\Throwable $e) {
            // Pusher/Reverb not configured or package not installed - FCM above already
            // handled delivery, this is best-effort only.
            Log::info('[AutoAssign] Realtime broadcast for order offer skipped: ' . $e->getMessage());
        }
    }

    private static function withdrawOtherOpenAttempts(int $orderId, ?int $exceptAttemptId): void
    {
        $open = DeliveryAssignmentAttempt::where('order_id', $orderId)
            ->where('status', DeliveryAssignmentAttempt::$statusOffered)
            ->when($exceptAttemptId, fn ($q) => $q->where('id', '!=', $exceptAttemptId))
            ->get();

        foreach ($open as $attempt) {
            $attempt->status = DeliveryAssignmentAttempt::$statusWithdrawn;
            $attempt->responded_at = now();
            $attempt->save();

            try {
                broadcast(new DeliveryBoyOfferWithdrawn($attempt->delivery_boy_id, $orderId))->toOthers();
            } catch (\Throwable $e) {
                Log::info('[AutoAssign] Realtime withdraw broadcast skipped: ' . $e->getMessage());
            }
        }
    }

    /**
     * Same side effects as OrdersApiController::assignDeliveryBoy() (bonus calc +
     * notifications) - kept as a private copy here rather than editing that controller,
     * so its existing behaviour/callers are untouched. If it ever changes, keep both in
     * sync (or a future refactor can extract a single shared method).
     */
    private static function applyAssignmentSideEffects(Order $order): void
    {
        $deliveryBoy = DeliveryBoy::find($order->delivery_boy_id);
        if (!$deliveryBoy) {
            return;
        }

        $bonusResult = CommonHelper::calculateDeliveryBoyBonus($deliveryBoy, floatval($order->final_total));
        $order->delivery_boy_bonus_details = json_encode($bonusResult['bonus_details']);
        $order->delivery_boy_bonus_amount = $bonusResult['bonus_amount'];
        $order->save();

        try {
            dispatch(function () use ($order) {
                CommonHelper::sendNotificationOrderAssignDeliveryBoy($order);
                CommonHelper::sendMailOrderStatus($order, true);
                CommonHelper::sendOrderNotificationsToAdmins($order, 'order_assign', $order->delivery_boy_id);
            })->afterResponse();
        } catch (\Throwable $e) {
            Log::error('[AutoAssign] post-accept notifications failed: ' . $e->getMessage());
        }
    }

    /**
     * "No driver accepted, needs manual" - reuses the existing admin/seller resolver
     * (CommonHelper::sendOrderNotificationsToAdmins already targets the right people)
     * plus a best-effort push, since that channel is in-app-only today (plan §7).
     */
    private static function notifyNeedsManualAssignment(Order $order): void
    {
        Log::info("[AutoAssign] order #{$order->id} exhausted rounds/time cap with no driver accepting - needs manual assignment.");

        try {
            dispatch(function () use ($order) {
                CommonHelper::sendOrderNotificationsToAdmins($order, 'auto_assign_failed', null);
            })->afterResponse();
        } catch (\Throwable $e) {
            Log::error('[AutoAssign] needs-manual notification failed: ' . $e->getMessage());
        }
    }

    private static function isAssignable(Order $order): bool
    {
        return !in_array((int) $order->active_status, [OrderStatusList::$cancelled, OrderStatusList::$returned], true);
    }

    private static function toFloatOrNull($value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }
        return (float) $value;
    }

    private static function haversineKm(float $lat1, float $lon1, float $lat2, float $lon2): float
    {
        $earthRadiusKm = 6371;
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a = sin($dLat / 2) ** 2 + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon / 2) ** 2;
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        return $earthRadiusKm * $c;
    }
}
