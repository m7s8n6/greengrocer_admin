<?php

namespace App\Models;
use App\Traits\HasTranslations;
use App\Traits\HasModuleContext;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
     use HasFactory, HasTranslations, HasModuleContext;

       protected $fillable = [
        'module_id',
        'name',
        'image',
        'status',
        'background_color_for_light_theme',
        'background_color_for_dark_theme'
    ];
    protected $translatable = [
        'name',
    ];
    protected $translationModel = 'BrandTranslation';
    protected $translationForeignKey = 'brand_id';

    protected $appends = ['image_url', 'translations'];

    public function getImageUrlAttribute(){
        $image_url = '';
        if($this->image){
            $image_url = asset('storage/'.$this->image);
        }
        return $image_url;
    }
     public function translations()
    {
        return $this->hasMany(BrandTranslation::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'brand_id', 'id');
    }
    

}
