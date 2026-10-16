<?php

namespace App\Models;

use App\Traits\HasTranslations;
use App\Traits\HasModuleContext;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory, HasTranslations, HasModuleContext;

    protected $fillable = [
        'module_id',
        'seller_id',
        'name',
        'type',
        'status',
    ];

    public static $types = ['text', 'color', 'image'];

    protected $translatable = [
        'name',
    ];
    protected $translationModel = 'AttributeTranslation';
    protected $translationForeignKey = 'attribute_id';

    protected $appends = ['translations'];

    public function translations()
    {
        return $this->hasMany(AttributeTranslation::class);
    }

    public function values()
    {
        return $this->hasMany(AttributeValue::class)->orderBy('sequence');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'attribute_category');
    }

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
}
