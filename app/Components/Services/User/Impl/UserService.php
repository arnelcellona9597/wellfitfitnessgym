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


    public function CreateUser( $data ) 
    {
        return $this->userRepository->CreateUser( $data );
    }
 
} 