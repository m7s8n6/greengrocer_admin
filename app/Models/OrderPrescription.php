<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderPrescription extends Model
{
    use HasFactory;

    protected $fillable = ['order_id', 'image'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset('storage/' . $this->image);
        }
        return '';
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function orderItems()
    {
        return $this->belongsToMany(OrderItem::class, 'order_prescription_items', 'order_prescription_id', 'order_item_id');
    }
}
