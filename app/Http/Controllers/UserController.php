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
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'password' => 'required|min:6',
            'type' => 'required|string'
            
        ]);
    
        try {
            $this->UserService->createUser($validated);
            return response()->json(['message' => 'User created successfully!'], 201);
        } catch (\Exception $e) {
            // Log::error('User creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Server error, please try again later.'], 500);
        }
    }
    
}