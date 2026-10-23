<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * One row per module. See docs/auto-assign-delivery-boy-plan.md §2/§2b.
 *
 * auto_assign_enabled defaults false at the DB level - every module behaves exactly as
 * before this feature existed until an admin explicitly turns it on for that module.
 */
class ModuleDeliverySetting extends Model
{
    protected $table = 'module_delivery_settings';

    protected $fillable = [
        'module_id',
        'auto_assign_enabled',
        'response_timeout_seconds',
        'max_rounds',
        'max_distance_km',
        'total_wait_cap_seconds',
        'max_concurrent_orders',
        'location_staleness_minutes',
    ];

    protected $casts = [
        'auto_assign_enabled' => 'boolean',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id', 'id');
    }

    /**
     * Never throws, never creates a row as a side effect - a module with no settings
     * row (shouldn't happen after the seed migration, but defensive) is treated as
     * fully manual/off, identical to today's behaviour.
     */
    public static function forModule($moduleId): ?self
    {
        if (empty($moduleId)) {
            return null;
        }

        return static::where('module_id', $moduleId)->first();
    }
}
