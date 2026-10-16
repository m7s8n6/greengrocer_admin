<?php

namespace App\Models;

use App\Traits\HasModuleContext;
use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomField extends Model
{
    use HasFactory, HasTranslations, HasModuleContext;

    protected $fillable = [
        'module',
        'seller_id',
        'name',
        'type',
        'options',
        'is_required',
        'status',
        'sort_order',
    ];

    protected $casts = [
        'options' => 'array',
        'is_required' => 'boolean',
        'status' => 'boolean',
    ];

    protected $translatable = [
        'name',
        'options',
    ];
    protected $translationModel = 'CustomFieldTranslation';
    protected $translationForeignKey = 'custom_field_id';

    protected $appends = ['translations'];

    public function translations()
    {
        return $this->hasMany(CustomFieldTranslation::class);
    }

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
}
