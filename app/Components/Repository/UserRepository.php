<?php 
namespace App\Components\Repository;

use App\Models\User;

use App\Mail\UserRegisteredMail;
use App\Mail\UserForgotPasswordMail;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cookie;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

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


    public function login(array $data)
    {

        $user = User::where('email', $data['email'])
                    ->where('password', $data['password']) // Direct password comparison (not recommended)
                    ->first();
    
        if (!$user) {
            throw new \Exception('Email or password is incorrect.');
        }

        $email_verified_at = $user->email_verified_at;

        // Add indication to the response if $user->email_verified_at is null....
        if (  $email_verified_at == NULL ) {
            $message = "Account not verified!";
        }
        else {
            $message = "Logged In";
            Cookie::queue(Cookie::forget('cu_user_id'));
            Cookie::queue(Cookie::make('cu_user_id', $user->id, 10080, null, null, false, false));
        }

        return [
            'email_verified_at' =>  $email_verified_at
        ];
    }

    public function forgotPassword(array $data) {
        $user = User::where('email', $data['email'])
                    ->first();
    
        if (!$user) {
            throw new \Exception('Email or password is incorrect.');
        }

        $email_verified_at = $user->email_verified_at;

        if (  $email_verified_at == NULL ) {
            $message = "Account not verified!";
        }
        else {
            $message = "Successs";

            Mail::to($user->email)->queue(new UserForgotPasswordMail($data));
            Cookie::queue(Cookie::forget('email'));
            Cookie::queue(Cookie::make('email', $user->email, 10080, null, null, false, false));
            
        }

        return [
            'email_verified_at' =>  $email_verified_at
        ];
    }


    public function resetPassword(array $data)
    {
        $user = User::where('email', $data['email'])
                    ->first();
    
        if (!$user) {
            throw new \Exception('Email or password is incorrect.');
        }

        $email_verified_at = $user->email_verified_at;

        // Add indication to the response if $user->email_verified_at is null....
        if (  $email_verified_at == NULL ) {
            $message = "Account not verified!";
        }
        else {
            $message = "Logged In";

            $user->password =  $data['password'];
            $user->save();

        }

        return [
            'email_verified_at' =>  $email_verified_at
        ];
    }
    

}