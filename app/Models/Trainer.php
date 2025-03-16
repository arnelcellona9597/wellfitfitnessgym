<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Trainer extends Model
{
    use HasFactory;

    protected $fillable = [
        'trainer_name', 
        'trainer_image'
    ]; 

    public static function trainers()
    {
        return self::orderBy('id', 'desc')->get();
    }
    
    public static function getTrainerByID($id)
    {
        return self::find($id);
    }    

}
