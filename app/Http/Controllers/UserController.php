<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Components\Services\User\IUserService;

use App\Models\Trainer;
use App\Models\Plan;
use App\Models\User;
use App\Models\UserPlan;
use App\Models\UserTrainer;
use App\Models\Inventory;
use App\Models\Gallery;
use App\Models\Review;

use App\Models\UserLog;
use Carbon\Carbon;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;
use App\Mail\MembershipPlanVerificationCodeMail;
use App\Mail\BookTrainerVerificationCodeMail;
 
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
                'email_verified_at' => $response['email_verified_at'],
                'type' => $response['type']
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

            UserLog::create([
                'log_user_id' => $request->user_id,
                'log_description' => 'Has been successully submitted data from the contact form.',
                'log_date' => Carbon::now(),
            ]);

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
            \Log::error("ID:". $request->id);
            // Find the user by ID
            $user = User::findOrFail($request->id);

            // Handle profile image upload
            if ($request->hasFile('profile')) {
                $file = $request->file('profile');
                $fileName = time() . '_' . $file->getClientOriginalName(); // Unique filename
                $destinationPath = public_path('template/images/'); // Dynamic path

                // Move file to the destination path
                $file->move(base_path('template/images'), $filename);



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


    

    public function BookTrainorCancel(Request $request) {
        $id = $request->query('id');
        $query = UserTrainer::find($id);
        if (!$query) {
            return response()->json(['error' => 'Plan not found'], 404);
        }
        $query->update(['trainer_status' => 'Cancelled']);
        return response()->json(['message' => 'cancelled successfully', 'query' => $query], 200);
    }

    public function BookTrainorDelete(Request $request) {
        $id = $request->input('id');
        // Find the plan by ID
        $query = UserTrainer::find($id);
        // Check if plan exists
        if (!$query) {
            return response()->json(['error' => 'Plan not found'], 404);
        }
        // Delete the plan
        $query->delete();
        return response()->json(['message' => 'deleted successfully'], 200);
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


    public function trainorConfirmationStepNav(Request $request)
    {
        // Generate a random 10-digit verification code
        $trainer_verification_code = rand(1000000000, 9999999999);
    
        // Store in cookie
        Cookie::queue(Cookie::forget('trainer_verification_code'));
        Cookie::queue(Cookie::make('trainer_verification_code', $trainer_verification_code, 10080, null, null, false, false));
    
        // Extract request data
        $data = $request->only(['trainer_name', 'trainer_image', 'email']);
        
        
        // Manually add verification code to array
        $data['trainer_verification_code'] = $trainer_verification_code;
    
        // Send email
        Mail::to($data['email'])->queue(new BookTrainerVerificationCodeMail($data));
    
        // Return response
        return response()->json([
            'message' => "success",
        ], 201);
    }

    public function adminDeletePlan(Request $request) {
        $id = $request->input('id');
        $query = Plan::find($id);
        if (!$query) {
            return response()->json(['error' => 'Not found'], 404);
        }
        $query->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }


    public function adminEditPlan(Request $request) {
        $id = $request->input('id');
        $duration = $request->input('duration');
        $price = $request->input('price');
        $plan_name = $request->input('plan_name');
        $plan_description = $request->input('plan_description');

 
        $query = Plan::find($id);
        if (!$query) {
            return response()->json(['error' => 'Plan not found'], 404);
        }
        $query->update([
            'duration' => $duration,
            'price' => $price,
            'plan_name' => $plan_name,
            'plan_description' => $plan_description
        ]);
        return response()->json(['message' => 'Membership cancelled successfully', 'plan' => $query], 200);
    }

    public function adminAddPlan(Request $request)
    {
        $query = Plan::create($request->all());
        return response()->json($query, 200);
    }
    

    public function adminApprovePlan(Request $request)
    {
        $id = $request->query('id'); // ✅ use input() instead of query()
        $query = UserPlan::find($id);
        if (!$query) {
            return response()->json(['error' => 'Plan not found'], 404);
        }
        $query->update(['status' => 'Approved']);
        return response()->json(['query' => $query], 200);
    }

    
    public function adminAddTrainor(Request $request)
    {
        try {
            $filename = null;
    
            if ($request->hasFile('trainer_image')) {
                $file = $request->file('trainer_image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(base_path('template/images'), $filename);

            }
    
            \App\Models\Trainer::create([
                'trainer_name' => $request->trainer_name,
                'trainer_image' => $filename,
                'log_description' => $request->log_description,
            ]);
    
            return response()->json(['message' => 'Trainer added successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function adminApproveBooking(Request $request)
    {
        $id = $request->query('id'); // ✅ use input() instead of query()
        $query = UserTrainer::find($id);
        if (!$query) {
            return response()->json(['error' => 'Not found'], 404);
        }
        $query->update(['trainer_status' => 'Approved']);
        return response()->json(['query' => $query], 200);
    }

    

    public function adminEditTrainer(Request $request)
    {
        try {
            // Find the trainer by ID
            $trainer = \App\Models\Trainer::findOrFail($request->id);
    
            // Handle new image upload if provided
            if ($request->hasFile('trainer_image')) {
                $file = $request->file('trainer_image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(base_path('template/images'), $filename);

                $trainer->trainer_image = $filename;
            }
    
            // Update trainer name
            $trainer->trainer_name = $request->trainer_name;
            $trainer->log_description = $request->log_description;
    
            // Save the updated trainer
            $trainer->save();
    
            return response()->json(['message' => 'Trainer updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    
    
    public function adminDeleteTrainer(Request $request) {
        $id = $request->input('id');
        $query = Trainer::find($id);
        if (!$query) {
            return response()->json(['error' => 'Not found'], 404);
        }
        $query->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }

    
    public function adminAddInventory(Request $request)
    {
        try {
            $filename = null;
    
            if ($request->hasFile('inventory_image')) {
                $file = $request->file('inventory_image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(base_path('template/images'), $filename);

            }
    
           Inventory::create([
                'inventory_name' => $request->inventory_name,
                'inventory_image' => $filename,
                'inventory_description' => $request->inventory_description,
                'inventory_quantity' => $request->inventory_quantity,
            ]);
    
            return response()->json(['message' => 'Added Successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function adminEditInventory(Request $request)
    {
        try {
       
            $db = \App\Models\Inventory::findOrFail($request->id);
    
            if ($request->hasFile('inventory_image')) {
                $file = $request->file('inventory_image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(base_path('template/images'), $filename);


                $db->inventory_image = $filename;
            }
    
            $db->inventory_name = $request->inventory_name;
        
            $db->inventory_description = $request->inventory_description;
            $db->inventory_quantity = $request->inventory_quantity;

            $db->save();
    
            return response()->json(['message' => 'Updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
        
    public function adminDeleteInventory(Request $request) {
        $id = $request->input('id');
        $query = Inventory::find($id);
        if (!$query) {
            return response()->json(['error' => 'Not found'], 404);
        }
        $query->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }


    public function adminGalleryAdd(Request $request)
    {
        try {
            $filename = null;
    
            if ($request->hasFile('gallery_image')) {
                $file = $request->file('gallery_image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(base_path('template/images'), $filename);


            }
    
           Gallery::create([
                'gallery_image' => $filename,
            ]);
    
            return response()->json(['message' => 'Added Successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function adminGalleryList(Request $request)
    {
    }

    public function adminGalleryDelete(Request $request) {
        $id = $request->input('id');
        // Find the plan by ID
        $query = Gallery::find($id);
        // Check if plan exists
        if (!$query) {
            return response()->json(['error' => 'Not found'], 404);
        }
        // Delete the plan
        $query->delete();
        return response()->json(['message' => 'Deleted successfully'], 200);
    }

    public function adminReviewDelete(Request $request) {
        $id = $request->input('id');
        $query = Review::find($id);
        if (!$query) {
            return response()->json(['error' => 'Not found'], 404);
        }
        $query->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }

    public function adminDeleteLog(Request $request) {
        $id = $request->input('id');
        $query = UserLog::find($id);
        if (!$query) {
            return response()->json(['error' => 'Not found'], 404);
        }
        $query->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
    
    
    public function adminDeleteAccount(Request $request) { 
        $id = $request->input('id');
        $query = User::find($id);
        if (!$query) {
            return response()->json(['error' => 'Not found'], 404);
        }
        $query->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
    
    

    public function adminCreateUser(Request $request)
    {
        try {
    
            Log::error( print_r($request->all(), true) );
            User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => $request->password,
                'verification_code' => $request->verification_code,
                'type' => "Member",
                'email_verified_at' => Carbon::now(),
            ]);
            return response()->json([
                'message' => 'success'
            ], 200);
    
        } catch (\Exception $e) {
            Log::error('User creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Server error, please try again later.'], 400);
        }
    }

}