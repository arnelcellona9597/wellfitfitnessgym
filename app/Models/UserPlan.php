<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class UserPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 
        'user_id', 
        'plan_id', 
        'start_date', 
        'end_date', 
        'payment_method',
        'status', 
        'payment_date', 

        'plan_duration', 
        'plan_price', 
        'plan_name', 
        'plan_description', 

        'created_at',
        'updated_at'
    ]; 
}