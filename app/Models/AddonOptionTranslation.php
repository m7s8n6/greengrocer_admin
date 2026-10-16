<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddonOptionTranslation extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'addon_option_id',
        'language_id',
        'name',
    ];

    public function option()
    {
        return $this->belongsTo(AddonOption::class, 'addon_option_id');
    }
}
