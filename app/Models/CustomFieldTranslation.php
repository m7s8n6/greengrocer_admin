<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomFieldTranslation extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'custom_field_id',
        'language_id',
        'name',
        'options',
    ];

    protected $casts = [
        'options' => 'array',
    ];

    public function customField()
    {
        return $this->belongsTo(CustomField::class);
    }
}
