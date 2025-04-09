<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Carbon; 
class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name', 
        'last_name', 
        'phone', 
        'email', 
        'type', 
        'password',
        'profile', 
        'age', 
        'gender',
        'address',
        'verification_code',
        'email_verified_at'
    ]; 

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public static function getUserInfo($userId)
    {
        return self::find($userId);
    }

    public static function users()
    {
        return self::orderBy('id', 'desc')->get();
    }
    
    

    public static function getTotalSales($startDate = null, $endDate = null) {
        // Calculate User Plan Sales
        $UserPlanSales = self::leftJoin('user_plans', 'users.id', '=', 'user_plans.user_id')
                        ->where('user_plans.status', 'Approved')
                        ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                            $query->whereBetween('user_plans.created_at', [
                                Carbon::parse($startDate)->startOfDay(),
                                Carbon::parse($endDate)->endOfDay()
                            ]);
                        })
                        ->sum('user_plans.plan_price');
        
        // Calculate User Booking Sales
        $UserBookingSales = self::leftJoin('user_trainers', 'users.id', '=', 'user_trainers.trainer_user_id')
            ->where('user_trainers.trainer_status', 'Approved')
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                $query->whereBetween('user_trainers.created_at', [
                    Carbon::parse($startDate)->startOfDay(),
                    Carbon::parse($endDate)->endOfDay()
                ]);
            })
            ->sum('user_trainers.trainer_total_price');
    
        // Return total sales from both sources
        return $UserPlanSales + $UserBookingSales;
    }
    
    
    
    
    
    
    
    
}
