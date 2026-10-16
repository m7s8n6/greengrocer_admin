<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasModuleContext;

class PickupLocation extends Model
{
    use HasFactory, HasModuleContext;
}
