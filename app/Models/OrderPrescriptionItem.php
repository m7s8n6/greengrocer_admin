<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderPrescriptionItem extends Model
{
    use HasFactory;

    protected $fillable = ['order_prescription_id', 'order_item_id'];
}
