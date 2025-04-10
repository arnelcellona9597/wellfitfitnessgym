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
    
    
    
    public static function getTotalSalesByOTC($startDate = null, $endDate = null) { 
        // Calculate User Plan Sales
        $UserPlanSales = self::leftJoin('user_plans', 'users.id', '=', 'user_plans.user_id')
                        ->where('user_plans.status', 'Approved')
                        ->where('user_plans.payment_method', 'Over The Counter')
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
            ->where('user_trainers.trainer_payment_method', 'Over The Counter')
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

    public static function getTotalSalesByGCASH($startDate = null, $endDate = null) { 
        // Calculate User Plan Sales
        $UserPlanSales = self::leftJoin('user_plans', 'users.id', '=', 'user_plans.user_id')
                        ->where('user_plans.status', 'Approved')
                        ->where('user_plans.payment_method', 'GCASH')
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
            ->where('user_trainers.trainer_payment_method', 'GCASH')
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
    
    public static function getTotalReportMembership($startDate = null, $endDate = null) {
        // Parse the start and end date if they are provided
        // ✅ If start or end date is null, fallback to last 30 days
        if (!$startDate || !$endDate) {
            $endDate = Carbon::now()->endOfDay();
            $startDate = Carbon::now()->subDays(29)->startOfDay(); // includes today (30 total)
        } else {
            $startDate = Carbon::parse($startDate)->startOfDay();
            $endDate = Carbon::parse($endDate)->endOfDay();
        }
    
        // Initialize an array to hold the result
        $salesData = [];
    
        // Loop through each day between start and end date
        foreach (new \DatePeriod($startDate, \DateInterval::createFromDateString('1 day'), $endDate->addDay()) as $date) {
            // Format the date to 'Y-m-d' (same format as in URL parameters)
            $formattedDate = $date->format('Y-m-d');
    
            // Query for sales data for this specific date
            $sales = self::leftJoin('user_plans', 'users.id', '=', 'user_plans.user_id')
                ->where('user_plans.status', 'Approved')
                ->whereDate('user_plans.created_at', '=', $formattedDate) // Ensure you filter by exact date
                ->sum('user_plans.plan_price');
    
            // Add the sales data to the result array
            $salesData[$formattedDate] = $sales;
        }
    
        return $salesData;
    }

    public static function getTotalReportBooking($startDate = null, $endDate = null) {
        // ✅ If start or end date is null, fallback to last 30 days
        if (!$startDate || !$endDate) {
            $endDate = Carbon::now()->endOfDay();
            $startDate = Carbon::now()->subDays(29)->startOfDay(); // includes today (30 total)
        } else {
            $startDate = Carbon::parse($startDate)->startOfDay();
            $endDate = Carbon::parse($endDate)->endOfDay();
        }
    
        // Initialize an array to hold the result
        $salesData = [];
    
        // Loop through each day between start and end date
        foreach (new \DatePeriod($startDate, \DateInterval::createFromDateString('1 day'), $endDate->addDay()) as $date) {
            // Format the date to 'Y-m-d' (same format as in URL parameters)
            $formattedDate = $date->format('Y-m-d');
    
            // Query for sales data for this specific date
            $sales = self::leftJoin('user_trainers', 'users.id', '=', 'user_trainers.trainer_user_id')
                ->where('user_trainers.trainer_status', 'Approved')
                ->whereDate('user_trainers.created_at', '=', $formattedDate) // Ensure you filter by exact date
                ->sum('user_trainers.trainer_total_price');
    
            // Add the sales data to the result array
            $salesData[$formattedDate] = $sales;
        }
    
        return $salesData;
    }
    

}
