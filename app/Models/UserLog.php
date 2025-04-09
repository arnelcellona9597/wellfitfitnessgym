<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Carbon; 
class UserLog extends Model
{
    use HasFactory;

    protected $table = 'logs';
    
    protected $fillable = [
        'id', 
        'log_user_id', 
        'log_description', 
        'log_date'
    ];  

 
    public static function getAllLogs()
    {
 

        return self::leftJoin('users', 'logs.log_user_id', '=', 'users.id')
        ->orderBy('users.created_at', 'desc')
        ->select('logs.*', 'users.first_name', 'users.last_name')
        ->get();  

    }   

}
