<?php

namespace App\Models;
use Illuminate\Support\Carbon; 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'rate', 
        'comment'
    ]; 

    public function user()
    {
        return $this->belongsTo(User::class);
    }

 
    public static function getTwoLatestReviews()
    {
        return self::leftJoin('users', 'reviews.user_id', '=', 'users.id')
            ->orderBy('reviews.created_at', 'desc')
            ->take(2)
            ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    }


    public static function getReviews()
    {
        return self::leftJoin('users', 'reviews.user_id', '=', 'users.id')
            ->orderBy('reviews.created_at', 'desc')
            ->get(['reviews.*', 'users.first_name', 'users.last_name', 'users.profile']);
    }

    public static function getTotalReviews($startDate = null, $endDate = null)
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
