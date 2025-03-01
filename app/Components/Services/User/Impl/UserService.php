<?php

namespace App\Components\Services\User\Impl;

use App\Components\Services\User\IUserService;
use App\Components\Repository\UserRepository;

use Illuminate\Support\Facades\Mail;

use App\Mail\ContactFormMail;

class UserService implements IUserService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }


    public function createUser( $data ) 
    {
        return $this->userRepository->createUser( $data );
    }

    public function activateAccount( $data ) 
    {
        return $this->userRepository->activateAccount( $data );
    }

    public function login( $data ) 
    {
        return $this->userRepository->login( $data );
    }

    public function forgotPassword( $data ) 
    {
        return $this->userRepository->forgotPassword( $data );
    }

    public function resetPassword( $data ) 
    {
        return $this->userRepository->resetPassword( $data );
    }

    public function contactForm( $data ) 
    {
        Mail::to( env('MAIL_FROM_ADDRESS') )->queue(new ContactFormMail($data));

        return [
            'message' =>  'success'
        ];
    }

    
    public function updateMemberProfile( $data ) 
    {
        return $this->userRepository->updateMemberProfile( $data );
    }

    // public function addMembershipPlan( $data ) 
    // {
    //     return $this->userRepository->addMembershipPlan( $data );
    // }
    
 
} 