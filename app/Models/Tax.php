<?php

namespace App\Models;

use App\Traits\HasTranslations;
use App\Traits\HasModuleContext;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    use HasFactory, HasTranslations, HasModuleContext;

    protected $table = 'taxes';
    public $timestamps = false;

    protected $fillable = [
        'module_id',
        'title',
        'percentage',
        'status'
    ];
    
    protected $appends = ['translations'];
    protected $hidden = [];

     protected $translatable = [
        'title',
    ];

    protected $translationModel = 'TaxTranslation';

    protected $translationForeignKey = 'tax_id';
    public function translations()
{
    return $this->hasMany(TaxTranslation::class);
}
    
}
