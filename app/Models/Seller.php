<?php

namespace App\Models;

use App\Traits\HasTranslations;
use App\Traits\HasModuleContext;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory, HasTranslations, HasModuleContext;

    protected $translatable = [
        'name',
        'store_name',
        'store_description',
    ];

    protected $translationModel = 'SellerTranslation';

    protected $hidden = [];
    protected $appends = ['logo_url', 'national_identity_card_url', 'address_proof_url', 'tax_name', 'tax_number', 'pan_number', 'categories_array', 'pickup_store_timings_array', 'translations'];

    protected $casts = [
        'custom_field_values' => 'array',
    ];

    public static $statusRegistered = 0;
    public static $statusActive = 1;
    public static $statusRejected = 2;
    public static $statusDeactivated = 3;
    public static $statusRemoved = 7;
    public static $statusBlocked = 4;

    public static $Registered = "Registered";
    public static $Active = "Active";
    public static $Rejected = "Rejected";
    public static $Deactivated = "Deactivated";
    public static $Removed = "Removed";
    public static $Blocked = "Blocked";

    public function getLogoUrlAttribute()
    {
        if ($this->logo) {
            $logo_url = asset('storage/' . $this->logo);
            return $logo_url;
        }
        return $this->logo;
    }

    /**
     * tax_name/tax_number/pan_number/national_identity_card/address_proof were dropped as
     * columns - they now live in custom_field_values under the module=seller CustomField with
     * the matching name (seeded in version_4_0_0). These accessors keep every existing consumer
     * (e.g. RegisteredSellers.vue reading seller.tax_name / seller.national_identity_card_url)
     * working unchanged.
     */
    private function customFieldValueByName(string $name)
    {
        $fieldId = CustomField::where('module', 'seller')->where('name', $name)->value('id');
        if (!$fieldId) {
            return null;
        }
        $values = $this->custom_field_values ?? [];
        return $values[$fieldId] ?? null;
    }

    public function getTaxNameAttribute()
    {
        return $this->customFieldValueByName('Tax Name');
    }

    public function getTaxNumberAttribute()
    {
        return $this->customFieldValueByName('Tax Number');
    }

    public function getPanNumberAttribute()
    {
        return $this->customFieldValueByName('PAN Number');
    }

    public function getNationalIdentityCardUrlAttribute()
    {
        $path = $this->customFieldValueByName('NID (National ID)');
        return $path ? asset('storage/' . $path) : $path;
    }

    public function getAddressProofUrlAttribute()
    {
        $path = $this->customFieldValueByName('Address Proof');
        return $path ? asset('storage/' . $path) : $path;
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id', 'id');
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'id');
    }
    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id', 'id');
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'sellers', 'id', 'categories');
    }
    public function products()
    {
        return $this->hasMany(Product::class, 'seller_id', 'id');
    }
    public function getCategoriesArrayAttribute()
    {
        $categoriesArray = is_string($this->categories) ? explode(',', $this->categories) : [];
        $categoriesCollection = collect($categoriesArray);
        $categoryNames = Category::whereIn('id', $categoriesCollection)->get()->map(function ($category) {
            return $category->translated('name');
        })->toArray();
        $commaSeparatedNames = implode(', ', $categoryNames);
        return $commaSeparatedNames;
    }

    public function getPickupStoreTimingsArrayAttribute()
    {
        if ($this->pickup_store_timings) {
            return json_decode($this->pickup_store_timings, true);
        }
        return (object)[];
    }

    public function setPickupStoreTimingsAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['pickup_store_timings'] = json_encode($value);
        } else {
            $this->attributes['pickup_store_timings'] = $value;
        }
    }
}