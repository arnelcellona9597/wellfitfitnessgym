<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Components\Services\User\IUserService;

use App\Models\User;
use App\Models\UserPlan;
 
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;
use App\Mail\MembershipPlanVerificationCodeMail;
 
use App\Mail\UserForgotPasswordMail;

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
 


        $user = User::where('email', $request['email'])
        ->first();

        if (!$user) {
        throw new \Exception('Email or password is incorrect.');
        }

        $email_verified_at = $user->email_verified_at;

        if (  $email_verified_at == NULL ) {
        $message = "Account not verified!";

        return response()->json(['message' => 'Account not verified'], 400);

        }
        else {
        $message = "Successs";

        $data = $request->only(['email']);

        Mail::to($user->email)->queue(new UserForgotPasswordMail($data));
        Cookie::queue(Cookie::forget('email'));
        Cookie::queue(Cookie::make('email', $user->email, 10080, null, null, false, false));

        return response()->json([
            'email_verified_at' => 'email_verified_at'
        ], 200);

        }



        // $validated = $request->validate([
        //    'email' => 'required|email|exists:users,email'
        // ]);
    
        // try {
        //     $response = $this->UserService->forgotPassword($request);

        //     return response()->json([
        //         'email_verified_at' => $response['email_verified_at']
        //     ], 200);


        // } catch (\Exception $e) {
        //     Log::error('User creation failed: ' . $e->getMessage());
        //     return response()->json(['message' => 'Server error, please try again later.'], 400);
        // }
    }

    public function resetPassword(Request $request)
    {


        $user = User::where('email', $request['email'])
        ->first();

        if (!$user) {
        throw new \Exception('Email or password is incorrect.');
        }

        $email_verified_at = $user->email_verified_at;

        // Add indication to the response if $user->email_verified_at is null....
        if (  $email_verified_at == NULL ) {
        $message = "Account not verified!";

       return response()->json(['message' => 'Server error, please try again later.'], 400);

        }
        else {
        $message = "Logged In";

        $user->password =  $request['password'];
        $user->save();

        return response()->json([
            'email_verified_at' => $email_verified_at
        ], 200);

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
            $user = User::findOrFail($request->id);

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

            // Update only if the field is not null
            if (!is_null($request->first_name)) {
                $user->first_name = $request->first_name;
            }
            if (!is_null($request->last_name)) {
                $user->last_name = $request->last_name;
            }
            if (!is_null($request->email)) {
                $user->email = $request->email;
            }
            if (!is_null($request->phone)) {
                $user->phone = $request->phone;
            }
            if (!is_null($request->age)) {
                $user->age = $request->age;
            }
            if (!is_null($request->gender)) {
                $user->gender = $request->gender;
            }
            if (!is_null($request->address)) {
                $user->address = $request->address;
            }

            if (!is_null($request->password)) {
                $user->password = $request->password;
            }


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


    public function addMembershipPlanStep(Request $request)
    {
        // Generate a random 10-digit verification code
        $membership_verification_code = rand(1000000000, 9999999999);
    
        // Store in cookie
        Cookie::queue(Cookie::forget('membership_verification_code'));
        Cookie::queue(Cookie::make('membership_verification_code', $membership_verification_code, 10080, null, null, false, false));
    
        // Extract request data
        $data = $request->only(['email', 'plan_name', 'price', 'duration']);
        
        // Manually add verification code to array
        $data['membership_verification_code'] = $membership_verification_code;
    
        // Send email
        Mail::to($data['email'])->queue(new MembershipPlanVerificationCodeMail($data));
    
        // Return response
        return response()->json([
            'message' => "success",
        ], 201);
    }
    

    public function addMembershipPlanStep2(Request $request)
    {
        $userPlan = UserPlan::create($request->all());
        return response()->json($userPlan, 201);
    }

    public function addMembershipPlanStep3(Request $request)
    {
        $userPlan = UserPlan::create($request->all());
        return response()->json($userPlan, 201);
    }

    public function MemberPlanCancel(Request $request) {
        $id = $request->query('id');
        $userPlan = UserPlan::find($id);
        if (!$userPlan) {
            return response()->json(['error' => 'Plan not found'], 404);
        }
        $userPlan->update(['status' => 'Cancelled']);
        return response()->json(['message' => 'Membership cancelled successfully', 'plan' => $userPlan], 200);
    }

    public function MemberPlanDelete(Request $request) {
        $id = $request->input('id');
        // Find the plan by ID
        $userPlan = UserPlan::find($id);
        // Check if plan exists
        if (!$userPlan) {
            return response()->json(['error' => 'Plan not found'], 404);
        }
        // Delete the plan
        $userPlan->delete();
        return response()->json(['message' => 'Membership deleted successfully'], 200);
    }
    
    
}