<?php

namespace App\Components\Repository;

use App\Models\User;

class UserRepository
{
    public function CreateUser(array $data)
    {
        return User::create($data);
    }
}
