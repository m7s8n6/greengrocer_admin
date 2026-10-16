<?php

namespace App\Models;

use App\Traits\HasTranslations;
use App\Traits\HasModuleContext;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory, HasTranslations, HasModuleContext;

    protected $translatable = [
        'name',
        'subtitle',
        'meta_title',
        'meta_keywords',
        'schema_markup',
        'meta_description',
    ];

    protected $translationModel = 'CategoryTranslation';

    protected $appends = ['image_url','has_child','has_active_child','translations']; 

    protected $hidden = ['created_at','updated_at','deleted_at'];

    public function getImageUrlAttribute(){

        if($this->image){
            $image_url = asset('storage/'.$this->image);
            return $image_url;
        }
        return $this->image;
    }

    public function attributes(){
        return $this->belongsToMany(Attribute::class, 'attribute_category')->with('values');
    }

    public function parent(){
        return $this->hasOne(Category::class,'id','parent_id');
    }

    public function allParents() {
        return $this->parent()->with('allParents');
    }

    public function childs() {
        return $this->hasMany(Category::class,'parent_id','id');
    }

    public function allChilds() {
        return $this->childs()->with('allChilds');
    }

    public function activeChilds() {
        return $this->hasMany(Category::class,'parent_id','id')->where('status',1);
    }

    public function allActiveChilds() {
        return $this->activeChilds()->with('allActiveChilds');
    }

    public function catChilds() {
        return $this->hasMany(Category::class,'parent_id','id');
    }

    public function getHasChildAttribute(){
        if ($this->relationLoaded('catChilds')) {
            return $this->getRelation('catChilds')->count() > 0;
        }
        return Category::where('parent_id', $this->id)->exists();
    }

    public function catActiveChilds() {
        return $this->hasMany(Category::class,'parent_id','id')->where('status',1)->with('catActiveChilds');
    }

    public function getHasActiveChildAttribute(){
        if ($this->relationLoaded('catActiveChilds')) {
            return $this->getRelation('catActiveChilds')->count() > 0;
        }
        return Category::where('parent_id', $this->id)->where('status', 1)->exists();
    }
}
