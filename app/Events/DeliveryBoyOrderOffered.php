<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Pushed to one driver over Pusher/Reverb when they're offered an order in an
 * auto-assign broadcast round (see AutoAssignDeliveryBoyService, plan §7).
 *
 * Supplementary to the existing FCM push (FirebaseHelper) - not a replacement. Callers
 * must wrap `broadcast(new self(...))` in a try/catch (see
 * AutoAssignDeliveryBoyService::pushOffer) since neither pusher/pusher-php-server nor
 * laravel/reverb is installed in this app yet; a missing driver class must never break
 * the underlying order flow.
 */
class DeliveryBoyOrderOffered implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $deliveryBoyId;
    public int $orderId;
    public float $distanceKm;
    public int $responseTimeoutSeconds;

    public function __construct(int $deliveryBoyId, int $orderId, float $distanceKm, int $responseTimeoutSeconds)
    {
        $this->deliveryBoyId = $deliveryBoyId;
        $this->orderId = $orderId;
        $this->distanceKm = $distanceKm;
        $this->responseTimeoutSeconds = $responseTimeoutSeconds;
    }

    public function broadcastOn(): Channel
    {
        return new PrivateChannel('delivery-boy.' . $this->deliveryBoyId);
    }

    public function broadcastAs(): string
    {
        return 'order_offer';
    }

    public function broadcastWith(): array
    {
        return [
            'order_id' => $this->orderId,
            'distance_km' => $this->distanceKm,
            'response_timeout_seconds' => $this->responseTimeoutSeconds,
        ];
    }
}
