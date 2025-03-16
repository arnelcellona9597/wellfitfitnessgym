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

    public static function getUserLatestMembership($userId)
    {
        return self::leftJoin('users', 'user_plans.user_id', '=', 'users.id')
            ->where('user_plans.user_id', $userId)
            ->orderBy('user_plans.created_at', 'desc')
            ->select('user_plans.*', 'users.first_name', 'users.last_name') // Corrected select clause
            ->first();
    }
    
    public static function getUserMembership($userId)
    {
        return self::leftJoin('users', 'user_plans.user_id', '=', 'users.id')
            ->where('user_plans.user_id', $userId)
            ->orderBy('user_plans.created_at', 'desc')
            ->select('user_plans.*', 'users.first_name', 'users.last_name')
            ->get();  
    }
    
    public static function getMembershipByID($id)
    {
        return self::leftJoin('users', 'user_plans.user_id', '=', 'users.id')
            ->where('user_plans.id', $id) // Ensure correct column name
            ->orderBy('user_plans.created_at', 'desc')
            ->select('user_plans.*', 'users.first_name', 'users.last_name')
            ->first();
    }
    
    

}


