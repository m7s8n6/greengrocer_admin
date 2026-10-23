<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;
use App\Models\DeliveryBoyTranslation;
class DeliveryBoy extends Model
{
    use HasFactory, HasTranslations;

    protected $table = 'delivery_boys';
    protected $translationModel = 'DeliveryBoyTranslation';

    protected $fillable = [
        'name',
        'admin_id',
        'dob',
        'mobile',
        'email',
        'city_id',
        'status',
        'remark',
        'bonus_type',
        'bonus_percentage',
        'bonus_min_amount',
        'bonus_max_amount',
        'custom_field_values',
        'seller_id',
        'is_online',
        'current_latitude',
        'current_longitude',
        'location_updated_at',
    ];

    protected $casts = [
        'custom_field_values' => 'array',
        'is_online' => 'boolean',
        'location_updated_at' => 'datetime',
    ];

    protected $translationAttributes = [
        'name',
    ];

    protected $translationForeignKey = 'delivery_boy_id';

    protected $translatable = [
        'name',
    ];

    protected $appends = [
        'pending_order_count',
        'driving_license_url',
        'national_identity_card_url',
        'bank_name',
        'bank_account_number',
        'ifsc_code',
        'account_name',
        'address',
        'other_payment_information',
        'translations'
    ];

    protected $hidden = ['updated_at'];

    public static $bonusFixed = 0;
    public static $bonusCommission = 1;
    public static $commission = "Commission";
    public static $fixed = "Fixed/Salaried";

    public static $statusRegistered = 0;
    public static $statusActive = 1;
    public static $statusRejected = 2;
    public static $statusDeactivated = 3;
    public static $statusBlocked = 4;
    public static $statusRemoved = 7;

    public static $Registered = "Registered";
    public static $Active = "Active";
    public static $Rejected = "Rejected";
    public static $Deactivated = "Deactivated";
    public static $Blocked = "Blocked";
    public static $Removed = "Removed";

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id', 'id');
    }

    public function getPendingOrderCountAttribute()
    {
        $ignoreStatus = array(
            OrderStatusList::$paymentPending,
            OrderStatusList::$delivered,
            OrderStatusList::$cancelled,
            OrderStatusList::$returned,
        );
        return Order::where('delivery_boy_id', $this->id)->whereNotIn('active_status', $ignoreStatus)->count();
    }

    public function translations()
    {
        return $this->hasMany(DeliveryBoyTranslation::class, 'delivery_boy_id');
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'id');
    }

    /**
     * Every city this driver serves (delivery_boy_cities). `city_id` is kept as the primary/first
     * one for older readers.
     */
    public function cities()
    {
        return $this->belongsToMany(City::class, 'delivery_boy_cities', 'delivery_boy_id', 'city_id');
    }

    /**
     * Cities picked in a request: `city_ids[]` (multi-select forms) or, for older clients, the
     * single `city_id`. Unique ints; the first one is stored as the legacy delivery_boys.city_id.
     */
    public static function cityIdsFromRequest($request): array
    {
        $ids = $request->input('city_ids');
        if (is_string($ids)) {
            $ids = explode(',', $ids);
        }
        if (empty($ids) && $request->filled('city_id')) {
            $ids = [$request->input('city_id')];
        }

        return array_values(array_unique(array_filter(array_map('intval', (array) $ids))));
    }

    /**
     * Drivers serving $cityId - either through the pivot or the legacy single city_id.
     */
    public function scopeServingCity($query, $cityId)
    {
        return $query->where(function ($q) use ($cityId) {
            $q->where('delivery_boys.city_id', $cityId)
                ->orWhereExists(function ($sub) use ($cityId) {
                    $sub->select(\DB::raw(1))
                        ->from('delivery_boy_cities as dbc')
                        ->whereColumn('dbc.delivery_boy_id', 'delivery_boys.id')
                        ->where('dbc.city_id', $cityId);
                });
        });
    }

    /**
     * Drivers serving any of the given cities.
     */
    public function scopeServingAnyCity($query, array $cityIds)
    {
        return $query->where(function ($q) use ($cityIds) {
            if (empty($cityIds)) {
                $q->whereRaw('1 = 0');
                return;
            }
            foreach (array_values($cityIds) as $i => $cid) {
                $i === 0 ? $q->servingCity($cid) : $q->orWhere(fn ($qq) => $qq->servingCity($cid));
            }
        });
    }

    /**
     * Set only when this driver belongs to one seller's own fleet (§2b, auto-assign
     * delivery boy plan) - null for every shared-pool driver, including all pre-existing
     * rows.
     */
    public function seller()
    {
        return $this->belongsTo(Seller::class, 'seller_id', 'id');
    }

    /**
     * driving_license/national_identity_card/bank_name/bank_account_number/ifsc_code/
     * account_name/address/other_payment_information were dropped as columns - they now live in
     * custom_field_values under the module=delivery_boy CustomField with the matching name
     * (seeded in version_4_0_0). These accessors keep every existing consumer working unchanged.
     */
    /** Custom-field ids by name, looked up once per request instead of once per driver per accessor. */
    private static array $customFieldIdCache = [];

    private function customFieldValueByName(string $name)
    {
        if (!array_key_exists($name, self::$customFieldIdCache)) {
            self::$customFieldIdCache[$name] = CustomField::where('module', 'delivery_boy')->where('name', $name)->value('id');
        }
        $fieldId = self::$customFieldIdCache[$name];
        if (!$fieldId) {
            return null;
        }
        $values = $this->custom_field_values ?? [];
        return $values[$fieldId] ?? null;
    }

    public function getDrivingLicenseUrlAttribute()
    {
        $path = $this->customFieldValueByName('Driving License');
        return $path ? asset('storage/' . $path) : $path;
    }

    public function getNationalIdentityCardUrlAttribute()
    {
        $path = $this->customFieldValueByName('National ID Card');
        return $path ? asset('storage/' . $path) : $path;
    }

    public function getBankNameAttribute()
    {
        return $this->customFieldValueByName('Bank Name');
    }

    public function getBankAccountNumberAttribute()
    {
        return $this->customFieldValueByName('Bank A/C No.');
    }

    public function getIfscCodeAttribute()
    {
        return $this->customFieldValueByName('Bank IFSC Code');
    }

    public function getAccountNameAttribute()
    {
        return $this->customFieldValueByName('A/C Name');
    }

    public function getAddressAttribute()
    {
        return $this->customFieldValueByName('Address');
    }

    public function getOtherPaymentInformationAttribute()
    {
        return $this->customFieldValueByName('Other Payment Info');
    }
}
