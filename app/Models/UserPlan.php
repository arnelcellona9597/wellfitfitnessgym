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
        'payment_status', 
        'payment_date', 
        'created_at',
        'updated_at'
    ]; 


}
