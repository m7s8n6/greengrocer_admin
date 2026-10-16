<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Traits\HasModuleContext;

class Order extends Model
{
    use HasFactory, SoftDeletes, HasModuleContext;

    public static $activeType = 1;
    public static $previousType = 0;
    protected $casts = [
        'additional_charges' => 'array',
        'prescription_images' => 'array',
    ];

    protected $appends = ['prescription_images_urls'];

    public function getPrescriptionImagesUrlsAttribute()
    {
        $urls = [];
        if (!empty($this->prescription_images)) {
            $images = is_array($this->prescription_images) ? $this->prescription_images : json_decode($this->prescription_images, true);
            if (is_array($images)) {
                foreach ($images as $img) {
                    $urls[] = asset('storage/' . $img);
                }
            }
        }
        return $urls;
    }

    public static $previousTypeStatus = 0;

    public static function boot()
    {
        parent::boot();
        static::deleting(function ($data) { // before delete() method call this
            $data->items()->delete();
        });

        static::saved(function ($order) {
            if ($order->wasRecentlyCreated || $order->wasChanged('active_status')) {
                $newStatus = $order->active_status;
                
                $userId = 0;
                $userType = \App\Models\OrderStatus::$userTypeScript; // Default to script/system
                
                if (auth()->check()) {
                    $user = auth()->user();
                    $userId = $user->id;
                    $userType = isset($user->role_id) ? $user->role_id : \App\Models\OrderStatus::$userTypeUser;
                } else {
                    $userId = $order->user_id;
                    $userType = \App\Models\OrderStatus::$userTypeUser;
                }
                
                $orderStatus = [
                    'order_id' => $order->id,
                    'order_item_id' => 0,
                    'status' => $newStatus,
                    'created_by' => $userId,
                    'user_type' => $userType,
                ];
                \App\Helpers\CommonHelper::setOrderStatus($orderStatus);
            }
        });
    }

    function getActiveStatusNameAttribute()
    {

    }

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function orderStatus()
    {
        return $this->hasMany(OrderStatus::class, 'order_id', 'id');
    }

    // Relationship: Order belongs to a user subscription (if applicable)
    public function subscription()
    {
        return $this->belongsTo(UserSubscription::class, 'subscription_id', 'id');
    }

    public function setDeliveryBoyBonusDetailsAttribute($value)
    {
        $this->attributes['delivery_boy_bonus_details'] = json_encode($value);
    }

    public function getDeliveryBoyBonusDetailsAttribute($value)
    {
        return json_decode($value, true);
    }

}
