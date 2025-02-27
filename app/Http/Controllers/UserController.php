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
            'password' => 'required|string',
            'type' => 'required|string',
            'verification_code' => 'required|string'
        ]);
    
        try {
            $this->UserService->createUser($validated);
            return response()->json(['message' => 'User created successfully!'], 201);
        } catch (\Exception $e) {
            // Log::error('User creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Server error, please try again later.'], 500);
        }
    }



    public function activateAccount(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:users,email',  // Ensures email exists in the database
            'verification_code' => 'required|string'
        ]);

        try {
            $this->UserService->activateAccount($validated);
            return response()->json(['message' => 'Account activated successfully!'], 200); // Return 200 OK
        } catch (\Exception $e) {
            // Log the exception if necessary
            return response()->json(['message' => $e->getMessage()], 400); // Return 400 Bad Request for validation issues
        }
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
           'email' => 'required|email|exists:users,email',
            'password' => 'required|string'
        ]);
    
        try {
            $response = $this->UserService->login($validated);

            return response()->json([
                'email_verified_at' => $response['email_verified_at']
            ], 200);


        } catch (\Exception $e) {
            Log::error('User creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Server error, please try again later.'], 400);
        }
    }

    public function forgotPassword(Request $request)
    {
        $validated = $request->validate([
           'email' => 'required|email|exists:users,email'
        ]);
    
        try {
            $response = $this->UserService->forgotPassword($validated);

            return response()->json([
                'email_verified_at' => $response['email_verified_at']
            ], 200);


        } catch (\Exception $e) {
            Log::error('User creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Server error, please try again later.'], 400);
        }
    }

    public function resetPassword(Request $request)
    {
        $validated = $request->validate([
           'email' => 'required|email|exists:users,email',
           'password' => 'required|string'
        ]);
    
        try {
            $response = $this->UserService->resetPassword($validated);

            return response()->json([
                'email_verified_at' => $response['email_verified_at']
            ], 200);


        } catch (\Exception $e) {
            Log::error('User creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Server error, please try again later.'], 400);
        }
    }


    public function contactForm(Request $request)
    {
        try {
            $response = $this->UserService->contactForm($request->all());
            return response()->json([
                'message' => 'success'
            ], 200);
    
        } catch (\Exception $e) {
            Log::error('User creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Server error, please try again later.'], 400);
        }
    }


 

    public function updateMemberProfile(Request $request)
    {
        try {
            // Find the user by ID
            $user = \App\Models\User::findOrFail($request->id);
    
            // Handle profile image upload
            if ($request->hasFile('profile')) {
                $file = $request->file('profile');
                $fileName = time() . '_' . $file->getClientOriginalName(); // Unique filename
                $destinationPath = public_path('template/images/'); // Dynamic path
    
                // Move file to the destination path
                $file->move($destinationPath, $fileName);
    
                // Store only the file name in the database
                $user->profile = $fileName;
            }
    
            // Update other user attributes
            $user->first_name = $request->first_name;
            $user->last_name  = $request->last_name;
            $user->email      = $request->email;
            $user->phone      = $request->phone;
            $user->age        = $request->age;
            $user->gender     = $request->gender;
            $user->address    = $request->address;
    
            // Save changes
            $user->save();
    
            return response()->json([
                'message' => 'success',
                'profile_image' => $fileName ?? $user->profile // Return file name if updated
            ], 200);
    
        } catch (\Exception $e) {
            \Log::error('User update failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Server error, please try again later.'
            ], 400);
        }
    }
    

    
    
    
    
}