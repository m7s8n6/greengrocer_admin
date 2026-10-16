<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddonGroup extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'module_id',
        'seller_id',
        'name',
        'sub_title',
        'type',
        'selection_type',
        'is_required',
        'max_select',
        'status',
        'row_order',
    ];

    protected $casts = [
        'is_required' => 'boolean',
    ];

    protected $translatable = [
        'name',
        'sub_title',
    ];
    protected $translationModel = 'AddonGroupTranslation';
    protected $translationForeignKey = 'addon_group_id';

    protected $appends = ['translations'];

    public function translations()
    {
        return $this->hasMany(AddonGroupTranslation::class);
    }

    public function options()
    {
        return $this->hasMany(AddonOption::class)->orderBy('row_order');
    }

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_addon_groups');
    }
}
