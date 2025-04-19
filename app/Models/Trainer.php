<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon; 
use Illuminate\Foundation\Auth\User as Authenticatable;

class Trainer extends Model
{
    use HasFactory;

    protected $fillable = [
        'trainer_name', 
        'trainer_image',
        'log_description'
    ]; 

    public static function trainers()
    {
        return self::orderBy('id', 'desc')->get();
    }
    
    public static function getTrainerByID($id)
    {
        return self::find($id);
    }    
 
    public static function getTotalTrainers($startDate = null, $endDate = null)
    {
        return self::when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                $query->whereBetween('created_at', [
                    Carbon::parse($startDate)->startOfDay(),
                    Carbon::parse($endDate)->endOfDay()
                ]);
            })
            ->count();
    }
    
    
}
