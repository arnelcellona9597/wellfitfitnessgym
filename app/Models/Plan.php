<?php

namespace App\Models;
use Illuminate\Support\Carbon; 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 
        'duration', 
        'price', 
        'plan_name', 
        'plan_description'
    ]; 

 
    public static function getAllPlans()
    {
        return self::all();
    }

    public static function getPlanByID($id)
    {
        return self::find($id);
    }    


}
