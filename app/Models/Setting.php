<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = ['variable', 'value'];

    public static $codModeGlobal = "global";
    public static $codModeProduct = "product";


    // Memoized per-request: this getter is called repeatedly (often per-row in loops)
    // across the codebase, so without a cache every call re-runs 2 queries for the same value.
    protected static $valueCache = [];

    public static function get_value($name)
    {
        if (array_key_exists($name, self::$valueCache)) {
            return self::$valueCache[$name];
        }

        $setting = self::where('variable', $name)->first();
        return self::$valueCache[$name] = $setting ? $setting->value : '';
    }

    /**
     * Global admin switch for sellers using their own drivers. Missing row counts as on so
     * installs that already have sellers on 'own' keep working until an admin turns it off.
     */
    public static function sellerOwnDriversAllowed(): bool
    {
        $value = self::get_value('allow_seller_own_drivers');
        return $value === '' || (int) $value === 1;
    }

    /**
     * Slot type actually in force for a module. Quick Delivery needs One Seller Cart, so a
     * module still saved as 'express' (set before this rule, or One Seller Cart turned off
     * since) behaves as 'fixed' until One Seller Cart is on again.
     */
    public static function effectiveTimeSlotType($moduleId): string
    {
        $type = self::get_value('time_slot_type_' . $moduleId) ?: 'fixed';
        if ($type === 'express' && (int) trim((string) self::get_value('one_seller_cart')) !== 1) {
            return 'fixed';
        }
        return $type;
    }

    public static function set_value($name, $value)
    {
        self::updateOrCreate(['variable' => $name], ['value' => $value]);
        unset(self::$valueCache[$name]);
    }

    public static function update_value($name, $value)
    {
        $settings = self::where('variable', $name);
        if ($settings->count() == 0) throw new \Exception("Empty Setting for " . $name);

        $setting = $settings->first();
        $setting->value = $value;
        $setting->save();

        unset(self::$valueCache[$name]);
    }
}
