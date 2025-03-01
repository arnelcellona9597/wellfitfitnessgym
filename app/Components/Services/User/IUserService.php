<?php
namespace App\Components\Services\User;

interface IUserService
{
    public function createUser( $data );
    public function activateAccount( $data );
    public function login( $data );
    public function forgotPassword( $data );
    public function resetPassword( $data );
    public function contactForm( $data );
    public function updateMemberProfile( $data );
    // public function addMembershipPlan( $data );

    
} 