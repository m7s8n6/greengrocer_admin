<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminToken extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = ['user_id', 'type', 'fcm_token', 'platform', 'language_id'];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            $token = trim($model->fcm_token ?? '');
            if (empty($token) || strtolower($token) === 'undefined' || strtolower($token) === 'null') {
                return false; // Cancel saving of invalid tokens
            }
        });
    }
}
