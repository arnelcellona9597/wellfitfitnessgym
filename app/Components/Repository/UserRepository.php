<?php 
namespace App\Components\Repository;

use App\Models\User;
use App\Mail\UserRegisteredMail;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cookie;
use Carbon\Carbon;

class UserRepository
{
    public function createUser(array $data)
    {
        // Check if email exists
        if (User::where('email', $data['email'])->exists()) {
            throw new \Exception('The email is already in use.');
        }

        // Create user
        $user = User::create($data);
        Mail::to($user->email)->queue(new UserRegisteredMail($data));

        // Clear the PHP cookie called "Email"
        Cookie::queue(Cookie::forget('email'));
        Cookie::queue(Cookie::forget('verification_code'));

        // Optionally, set a new cookie with the user's email (expires in 60 minutes)
        Cookie::queue(Cookie::make('email', $data['email'], 60, null, null, false, false));
        Cookie::queue(Cookie::make('verification_code', $data['verification_code'], 60, null, null, false, false));

    }


    public function activateAccount(array $data)
    {
        // Check if email and verification_code match
        $user = User::where('email', $data['email'])->where('verification_code', $data['verification_code'])->first();

        if (!$user) {
            throw new \Exception('Email or verification code is incorrect.');
        }

        // Update email_verified_at to current timestamp
        $user->email_verified_at = Carbon::now();
        $user->save();
    }

}