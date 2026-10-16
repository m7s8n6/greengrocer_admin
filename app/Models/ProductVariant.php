<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class ProductVariant extends Model
{

    use HasFactory;

    protected $fillable = [
        'id',
        'product_id',
        'attribute_value_id',
        'type',
        'measurement',
        'price',
        'purchase_price',
        'discounted_price',
        'stock',
        'stock_unit_id',
        'status',
    ];
    public $timestamps = false;
    protected $hidden = ['deleted_at'];

    public static $statusAvailable = 1;
    public static $statusSoldOut = 0;
    protected $appends = [

        'final_price_with_tax',
    ];

    public function images()
    {

        return $this->hasMany(ProductImages::class, 'product_variant_id', 'id');
    }

    public function attributeValue()
    {

        return $this->belongsTo(AttributeValue::class, 'attribute_value_id', 'id');
    }

    /**
     * Extra attribute values beyond the primary one, for multi-attribute combo variants
     * (e.g. Size + Length). Purely descriptive - stock/pricing math only ever reads
     * attribute_value_id / measurement / stock_unit_id above.
     */
    public function attributeValues()
    {
        return $this->belongsToMany(AttributeValue::class, 'product_variant_attribute_values')->withTimestamps();
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function getFinalPriceWithTaxAttribute()
    {
        $taxPercentage = $this->product->tax?->percentage ?? 0;

        $basePrice = ($this->attributes['discounted_price'] > 0 && $this->attributes['discounted_price'] !== null)
            ? $this->attributes['discounted_price']
            : $this->attributes['price'];

        return $basePrice;
    }
}
