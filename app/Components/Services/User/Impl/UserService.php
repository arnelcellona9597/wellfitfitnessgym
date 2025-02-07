<?php

namespace App\Components\Services\User\Impl;

use App\Components\Services\User\IUserService;
use App\Components\Repository\UserRepository;

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
 
} 