<?php 
namespace App\Components\Repository;

use App\Models\User;

class UserRepository
{
    public function CreateUser(array $data)
    {
        // Check if the email already exists
        if (User::where('email', $data['email'])->exists()) {
            throw new \Exception('The email is already in use.');
        }

        // Create the user if email does not exist
        $user = User::create($data);
    }
}
