<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveTracking extends Model
{
    use HasFactory; // Define the table name if it's not the default plural form
    protected $table = 'live_tracking';

    // Define the fillable attributes to allow mass assignment
    protected $fillable = [
        'order_id',
        'latitude',
        'longitude',
        'tracked_at',
    ];

    // Specify the type of the columns
    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'tracked_at' => 'datetime',
    ];

    /**
     * The one write path for a rider's position on an order - update_location saves it here, so
     * live_tracking, the rider's own position and the driver_location push always carry the same
     * latest value.
     */
    public static function record(Order $order, DeliveryBoy $driver, $latitude, $longitude): self
    {
        $tracking = static::updateOrCreate(
            ['order_id' => $order->id],
            ['latitude' => $latitude, 'longitude' => $longitude]
        );
        $tracking->touch(); // updated_at is the "tracked at" time even when the coordinates repeat

        $driver->current_latitude = $latitude;
        $driver->current_longitude = $longitude;
        $driver->location_updated_at = $tracking->updated_at;
        $driver->save();

        try {
            broadcast(new \App\Events\DriverLocationUpdated($order->id, (float) $latitude, (float) $longitude));
        } catch (\Throwable $e) {
            // Every location ping of every order out for delivery lands here, so a broken Pusher /
            // Reverb setup would write the same line many times a second. Log it once per 5 minutes.
            if (\Illuminate\Support\Facades\Cache::add('driver_location_broadcast_failed_logged', 1, now()->addMinutes(5))) {
                \Illuminate\Support\Facades\Log::error('DriverLocationUpdated broadcast failed (repeats suppressed for 5 minutes): ' . $e->getMessage());
            }
        }

        return $tracking;
    }

    /**
     * Latest known rider position for an order: the live_tracking row, or the assigned rider's
     * own position when that is newer (e.g. only update_location has been sent lately).
     * Returns an unsaved/in-memory row; null when nothing is known.
     */
    public static function freshestFor(?Order $order): ?self
    {
        if (!$order) {
            return null;
        }
        $tracking = static::where('order_id', $order->id)->orderBy('id', 'desc')->first();

        $driver = $order->delivery_boy_id ? DeliveryBoy::find($order->delivery_boy_id) : null;
        if (!$driver || $driver->current_latitude === null || $driver->current_longitude === null || !$driver->location_updated_at) {
            return $tracking;
        }
        if ($tracking && $tracking->updated_at && $driver->location_updated_at->lessThanOrEqualTo($tracking->updated_at)) {
            return $tracking;
        }

        $fresh = $tracking ?: new static(['order_id' => $order->id]);
        $fresh->latitude = $driver->current_latitude;
        $fresh->longitude = $driver->current_longitude;
        $fresh->updated_at = $driver->location_updated_at;
        return $fresh;
    }

    /**
     * Reply shared by customer/live_tracking_route and delivery_boy/live_tracking_route:
     * rider position, destination and road path. Null when no rider position is known.
     */
    public static function routePayload(Order $order): ?array
    {
        $tracking = static::freshestFor($order);
        if (!$tracking) {
            return null;
        }

        return [
            'driver' => ['latitude' => $tracking->latitude, 'longitude' => $tracking->longitude, 'tracked_at' => $tracking->updated_at],
            'destination' => ['latitude' => (float) $order->latitude, 'longitude' => (float) $order->longitude],
            'route' => \App\Helpers\CommonHelper::getRoutePath($tracking->latitude, $tracking->longitude, $order->latitude, $order->longitude),
        ];
    }

    /**
     * Define the relationship to the Order model
     * Assuming LiveTracking is related to an Order
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}