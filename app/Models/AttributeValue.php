<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'attribute_id',
        'value',
        'short_code',
        'color_code',
        'image',
        'sequence',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class, 'attribute_value_id', 'id');
    }
}
