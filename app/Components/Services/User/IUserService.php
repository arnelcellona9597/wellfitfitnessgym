<?php
namespace App\Components\Services\User;

interface IUserService
{
    public function createUser( $data );
    public function activateAccount( $data );
    public function login( $data );
} 