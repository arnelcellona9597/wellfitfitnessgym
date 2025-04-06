<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;

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
    

}
