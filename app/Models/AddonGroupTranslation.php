<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddonGroupTranslation extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'addon_group_id',
        'language_id',
        'name',
        'sub_title',
    ];

    public function group()
    {
        return $this->belongsTo(AddonGroup::class, 'addon_group_id');
    }
}
