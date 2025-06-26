<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserPlan;
use App\Models\UserTrainer;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\UserLog;
use Carbon\Carbon;
 
class TrainerPaymentController extends Controller
{ 
 
    public function trainerOverTheCounterPayment (Request $request) {

        // Parse start and end dates
        $startDate = $request->trainer_start_date;
        $endDate = $request->trainer_end_date;

        // Check for conflicts
        $conflict = UserTrainer::where('trainer_id', $request->trainer_id)
            ->where('trainer_time_schedule', $request->trainer_time_schedule)
            ->where('trainer_status', 'Approved')
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween('trainer_start_date', [$startDate, $endDate])
                    ->orWhereBetween('trainer_end_date', [$startDate, $endDate])
                    ->orWhere(function ($query) use ($startDate, $endDate) {
                        $query->where('trainer_start_date', '<=', $startDate)
                            ->where('trainer_end_date', '>=', $endDate);
                    });
            })
            ->exists();

        if ($conflict) {
            \Log::info('Return 3');
            return response()->json([
                'success' => false,
                'message' => 'This trainer is already booked during the selected schedule.'
            ], 409); // 409 Conflict
        }


        // Check for conflicts
        $conflict2 = UserTrainer::where('trainer_id', $request->trainer_id)
            ->where('trainer_time_schedule', $request->trainer_time_schedule)
            ->where('trainer_status', 'Pending')
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween('trainer_start_date', [$startDate, $endDate])
                    ->orWhereBetween('trainer_end_date', [$startDate, $endDate])
                    ->orWhere(function ($query) use ($startDate, $endDate) {
                        $query->where('trainer_start_date', '<=', $startDate)
                            ->where('trainer_end_date', '>=', $endDate);
                    });
            })
            ->exists();

        if ($conflict2) {
            \Log::info('Return 3');
            return response()->json([
                'success' => false,
                'message' => 'You have already requested schedule for training.'
            ], 409); // 409 Conflict
        }


        \Log::info('Return 2');
        $userPlan = UserTrainer::create($request->all()); 
        
        \Log::info('Return 1');
        // return redirect()->route('member.trainer.thankyou');
        return response()->json([
            'success' => false,
            'message' => 'Success'
        ], 200); // 409 Conflict

        UserLog::create([
            'log_user_id' => $request->input('user_id'),
            'log_description' => 'Has requested to book a trainer for GYM class',
            'log_date' => Carbon::now(),
        ]);

    }
    
    public function createPaymentIntent(Request $request)
    {
        
        $trainer_user_id = $request->input('trainer_user_id');
        $trainer_id = $request->input('trainer_id');
        $trainer_payment_method = $request->input('trainer_payment_method');
        $trainer_status = $request->input('trainer_status');
        $trainer_duration = $request->input('trainer_duration');
        $trainer_time_schedule = $request->input('trainer_time_schedule');
        $trainer_total_price = $request->input('trainer_total_price');
        $trainer_start_date = $request->input('trainer_start_date');
        $trainer_end_date = $request->input('trainer_end_date');
        $customer_name = $request->input('customer_name');
        $phone = $request->input('phone');
        $email = $request->input('email');


        UserLog::create([
            'log_user_id' => $request->input('user_id'),
            'log_description' => 'Has requested to book a trainer for GYM class',
            'log_date' => Carbon::now(),
        ]);

        \Log::info('REQUEST all 1:', $request->all());
 
        // Parse start and end dates
        $startDate = $request->trainer_start_date;
        $endDate = $request->trainer_end_date;

        // Check for conflicts
        $conflict = UserTrainer::where('trainer_id', $request->trainer_id)
            ->where('trainer_time_schedule', $request->trainer_time_schedule)
            ->where('trainer_status', 'Approved')
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween('trainer_start_date', [$startDate, $endDate])
                    ->orWhereBetween('trainer_end_date', [$startDate, $endDate])
                    ->orWhere(function ($query) use ($startDate, $endDate) {
                        $query->where('trainer_start_date', '<=', $startDate)
                            ->where('trainer_end_date', '>=', $endDate);
                    });
            })
            ->exists();

        if ($conflict) {
            return response()->json([
                'success' => false,
                'message' => 'This trainer is already booked during the selected schedule.'
            ], 409); // 409 Conflict
        }
       
        
  
        UserTrainer::create([
            'trainer_user_id' => $trainer_user_id,
            'trainer_id' => $trainer_id,
            'trainer_payment_method' => $trainer_payment_method,
            'trainer_status' => $trainer_status,
            'trainer_duration' => $trainer_duration,
            'trainer_time_schedule' => $trainer_time_schedule,
            'trainer_total_price' => $trainer_total_price,
            'trainer_start_date' => $trainer_start_date,
            'trainer_end_date' => $trainer_end_date
        ]);


        $client = new Client();

        try {
            $response = $client->request('POST', 'https://api.paymongo.com/v1/payment_intents', [
                'json' => [
                    'data' => [
                        'attributes' => [
                            'amount' => $trainer_total_price * 100, // Convert to cents
                            'payment_method_allowed' => ['gcash'],
                            'currency' => 'PHP',
                            'capture_type' => 'automatic',
                            'description' => "Book a Trainor",
                            'statement_descriptor' => 'Wellfit Fitness Gym',
                            'customer_name' => $customer_name,
                            'phone' => $phone,
                            'email' => $email
                        ]
                    ]
                ],
                'headers' => [
                    'accept' => 'application/json',
                    'authorization' => 'Basic ' . base64_encode(env('PAYMONGO_SECRET_KEY')), // Base64 encode the key
                    'content-type' => 'application/json',
                ],
            ]);

            $responseBody = json_decode($response->getBody(), true);
            $paymentIntentId = $responseBody['data']['id'];

            return response()->json([

                'payment_intent_id' => $paymentIntentId,
                'redirect_url' => route('trainerpayment.step2', 
                [
                    'customer_name' => $customer_name,
                    'phone' => $phone,
                    'email' => $email,
                    'payment_intent' => $paymentIntentId
                ])
            ]);

        } catch (\Exception $e) {
            \Log::error('Payment initiation failed: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function createPaymentMethod(Request $request)
    {


        $paymentIntentId = $request->get('payment_intent');
        $customer_name = $request->get('customer_name');
        $phone = $request->get('phone');
        $email = $request->get('email');

        \Log::info('REQUEST 2:', $request->all());

        // Dummy user data for testing
        $userInformation = [
            'name' => $customer_name,
            'email' => $email,
            'phone' => $phone,
            'address' => [
                'line1' => '123 Dummy St.',
                'city' => 'Dummy City',
                'state' => 'Dummy State',
                'postal_code' => '1234',
            ]
        ];

        $client = new Client();

        try {
            $response = $client->request('POST', 'https://api.paymongo.com/v1/payment_methods', [
                'json' => [
                    'data' => [
                        'attributes' => [
                            'billing' => [
                                'address' => [
                                    'line1' => $userInformation['address']['line1'],
                                    'city' => $userInformation['address']['city'],
                                    'state' => $userInformation['address']['state'],
                                    'postal_code' => $userInformation['address']['postal_code'],
                                    'country' => 'PH',
                                ],
                                'name' => $userInformation['name'],
                                'email' => $userInformation['email'],
                                'phone' => $userInformation['phone'],
                            ],
                            'type' => 'gcash'
                        ]
                    ]
                ],
                'headers' => [
                    'accept' => 'application/json',
                    'authorization' => 'Basic ' . base64_encode(env('PAYMONGO_SECRET_KEY')), // Base64 encode the key
                    'content-type' => 'application/json',
                ],
            ]);

            $responseBody = json_decode($response->getBody(), true);
            $paymentMethodId = $responseBody['data']['id'];

            // Now perform the redirection to the next step (step 3) without returning a JSON response
            return redirect()->to(route('trainerpayment.step3', [
  
              
                'customer_name' => $customer_name,
                'phone' => $phone,
                'email' => $email,
               
                'payment_intent' => $paymentIntentId,
                'paymentMethodId' => $paymentMethodId

            ])); // Redirect directly to step 3

        } catch (\Exception $e) {
            \Log::error('Payment method creation failed: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()]);
        }
    }


    public function attachPaymentMethod(Request $request)
    {
        try {
            
            $payment_method = $request->payment_method;
            $paymentMethodId = $request->get('paymentMethodId');
            $paymentIntentId = $request->get('payment_intent');
        
            if (!$paymentIntentId || !$paymentMethodId) {
                return response()->json(['error' => 'Missing payment intent or payment method ID'], 400);
            }
    
            // Set the return URL (Ensure this route exists)
            $returnUrl = route('trainerpayment.step4');
    
            $response = Http::withHeaders([
                'accept' => 'application/json',
                'authorization' => 'Basic ' . base64_encode(env('PAYMONGO_SECRET_KEY')),
                'content-type' => 'application/json',
            ])->post("https://api.paymongo.com/v1/payment_intents/{$paymentIntentId}/attach", [
                'data' => [
                    'attributes' => [
                        'payment_method' => $paymentMethodId,
                        'return_url' => $returnUrl, // Required for GCash
                    ]
                ]
            ]);
    
            $responseBody = $response->json();
            Log::info('PayMongo attach response: ' . json_encode($responseBody));
    
            if ($response->failed()) {
                return response()->json(['error' => $responseBody['errors'][0]['detail'] ?? 'Payment failed'], 400);
            }
    
            // Ensure payment was successful before inserting into database
            if (isset($responseBody['data']['attributes']['status']) && $responseBody['data']['attributes']['status'] === 'succeeded') {
   
            }
     
     

            // Redirect user to the next action URL if provided by PayMongo
            if (isset($responseBody['data']['attributes']['next_action']['redirect']['url'])) {
                return redirect()->to($responseBody['data']['attributes']['next_action']['redirect']['url']);
            }
    
            // Otherwise, redirect to the return URL with payment details
            return redirect()->route('trainerpayment.step4', [
                'payment_intent' => $paymentIntentId,
                'user_id' => $user_id,
            ]);
    
        } catch (\Exception $e) {
            Log::error('Payment Attach Error: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while processing your payment'], 500);
        }
    }
    


    public function handlePaymentStatus(Request $request)
    {
        
        $client = new Client();
        $paymentIntentId = $request->get('payment_intent');  
        \Log::info('REQUEST 4:', $request->all());
        try {
            // Get the payment intent status
            $response = $client->request('GET', 'https://api.paymongo.com/v1/payment_intents/' . $paymentIntentId, [
                'headers' => [
                    'accept' => 'application/json',
                    'authorization' => 'Basic ' . base64_encode(env('PAYMONGO_SECRET_KEY')), // Base64 encode the key
                ],
            ]);
            $responseBody = json_decode($response->getBody(), true);
            // Log response for debugging
            \Log::info('Payment status response: ' . json_encode($responseBody));
            // Check the payment status
            $status = $responseBody['data']['attributes']['status'];
            if ($status === 'succeeded') {
                // Payment succeeded, proceed with order confirmation or success
                return redirect()->route('order.success');      
            } elseif ($status === 'failed') {
                // Payment failed, proceed with error handling
                return redirect()->route('order.failed');
            } else {
                // Payment is still pending or requires further action (e.g., GCash confirmation)
                return redirect()->route('order.pending');
            }
        } catch (\Exception $e) {
            \Log::error('Error fetching payment status: ' . $e->getMessage());
            return redirect()->route('member.trainer.thankyou');
        }
    }
}
