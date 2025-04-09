<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon; 

class UserTrainer extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 
        'trainer_user_id',		
        'trainer_id',		
        'trainer_payment_method',		
        'trainer_status',	
        'trainer_start_date',		
        'trainer_end_date',		
        'trainer_time_schedule',
        'trainer_total_price',
        'trainer_duration',
        'created_at',
        'updated_at'
    ]; 

    

    public static function getUserLatestBookTrainor($userId)
    {
        return self::leftJoin('users', 'user_trainers.trainer_user_id', '=', 'users.id')
            ->leftJoin('trainers', 'user_trainers.trainer_id', '=', 'trainers.id')
            ->where('user_trainers.trainer_user_id', $userId)
            ->orderBy('user_trainers.created_at', 'desc')
            ->select('user_trainers.*', 'users.first_name', 'users.last_name', 'trainers.trainer_name') // Corrected select clause
            ->first();
    }
    
    

    public static function getUserBookTrainor($userId)
    {
        return self::leftJoin('users', 'user_trainers.trainer_user_id', '=', 'users.id')
            ->leftJoin('trainers', 'user_trainers.trainer_id', '=', 'trainers.id')
            ->where('user_trainers.trainer_user_id', $userId)
            ->orderBy('user_trainers.created_at', 'desc')
            ->select('user_trainers.*', 'users.first_name', 'users.last_name' ,'trainers.trainer_name') // Corrected select clause
            ->get();  
    }

    public static function getAllUserBookTrainor()
    {
        return self::leftJoin('users', 'user_trainers.trainer_user_id', '=', 'users.id')
            ->leftJoin('trainers', 'user_trainers.trainer_id', '=', 'trainers.id')
            ->orderBy('user_trainers.created_at', 'desc')
            ->select('user_trainers.*', 'users.first_name', 'users.last_name' ,'trainers.trainer_name') // Corrected select clause
            ->get();  
    } 

    public static function getBookTrainorByID($id)
    {
        return self::leftJoin('users', 'user_trainers.trainer_user_id', '=', 'users.id')
            ->leftJoin('trainers', 'user_trainers.trainer_id', '=', 'trainers.id')
            ->where('user_trainers.id', $id) // Ensure correct column name
            ->orderBy('user_trainers.created_at', 'desc')
            ->select('user_trainers.*', 'users.first_name', 'users.last_name' ,'trainers.trainer_name') // Corrected select clause
            ->first();
    }

    public static function getTotalBookings($startDate = null, $endDate = null)
    {
        return self::where('user_trainers.trainer_status', 'Approved')
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                $query->whereBetween('created_at', [
                    Carbon::parse($startDate)->startOfDay(),
                    Carbon::parse($endDate)->endOfDay()
                ]);
            })
            ->count();
    }
    

}
