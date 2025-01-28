<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Components\Services\User\IUserService;

class UserController extends Controller
{
    //
    private $UserService;

    public function __construct(IUserService $UserService)
    {
        $this->UserService = $UserService;
    }

    public function createUser(Request $request)
    {
        try {
            $data = $request->only(['first_name', 'last_name', 'email', 'password']);
            $this->UserService->createUser($data);
            return redirect('/success')->with('success', 'User created successfully!');
        } catch (\Exception $e) {
            \Log::error($e->getMessage()); // Log the error for debugging
            return redirect('/fail')->with('error', 'Something went wrong!');
        }
    }    
    
}