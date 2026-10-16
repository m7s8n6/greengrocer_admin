<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddonOption extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'addon_group_id',
        'name',
        'price',
        'discounted_price',
        'status',
        'row_order',
    ];

    protected $casts = [
        'price' => 'float',
        'discounted_price' => 'float',
    ];

    protected $translatable = [
        'name',
    ];
    protected $translationModel = 'AddonOptionTranslation';
    protected $translationForeignKey = 'addon_option_id';

    protected $appends = ['translations'];

    public function translations()
    {
        return $this->hasMany(AddonOptionTranslation::class);
    }

    public function group()
    {
        return $this->belongsTo(AddonGroup::class, 'addon_group_id');
    }
}
