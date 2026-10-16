<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialMedia extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = ['name', 'icon', 'image', 'link'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : '';
    }

    public function getIconAttribute($value)
    {
        return $this->image ? $this->image_url : $value;
    }
}
