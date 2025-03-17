<?php

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;

class EncryptCookies extends Middleware
{
    /**
     * The names of the cookies that should not be encrypted.
     *
     * @var array<int, string>
     */
    protected $except = [
        'cu_user_id',
        'verification_code',
        'email',
        'membership_verification_code',
        'trainer_verification_code'
    ];
}
