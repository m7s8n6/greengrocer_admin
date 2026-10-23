<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Audit + in-flight state for one broadcast offer to one driver for one order.
 * See docs/auto-assign-delivery-boy-plan.md §3/§7.
 */
class DeliveryAssignmentAttempt extends Model
{
    protected $table = 'delivery_assignment_attempts';

    protected $fillable = [
        'order_id',
        'delivery_boy_id',
        'round_number',
        'status',
        'distance_km',
        'offered_at',
        'responded_at',
    ];

    protected $casts = [
        'offered_at' => 'datetime',
        'responded_at' => 'datetime',
    ];

    public static $statusOffered = 'offered';
    public static $statusAccepted = 'accepted';
    public static $statusRejected = 'rejected';
    public static $statusTimeout = 'timeout';
    public static $statusWithdrawn = 'withdrawn';
    public static $statusManualOverride = 'manual_override';

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }

    public function deliveryBoy()
    {
        return $this->belongsTo(DeliveryBoy::class, 'delivery_boy_id', 'id');
    }
}
