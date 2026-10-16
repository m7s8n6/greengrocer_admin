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
