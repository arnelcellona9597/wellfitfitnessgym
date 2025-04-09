<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserPlan;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\UserLog;
use Carbon\Carbon;

class PaymentController extends Controller
{


    public function overTheCounterPayment (Request $request) {
        $userPlan = UserPlan::create($request->all());

        UserLog::create([
            'log_user_id' => $request->input('user_id'),
            'log_description' => 'Has been requested to avail of a membership plan.',
            'log_date' => Carbon::now(),
        ]);

        return redirect()->route('member.plan.thankyou');
    }
    
    public function createPaymentIntent(Request $request)
    {
        $user_id = $request->input('user_id');
        $plan_id = $request->input('plan_id');
        $plan_duration = $request->input('plan_duration'); 
        $plan_price = $request->input('plan_price');   
        $plan_name = $request->input('plan_name');   
        $plan_description = $request->input('plan_description'); 
        $payment_method = $request->input('payment_method');
        $payment_date = $request->input('payment_date');
        $status = $request->input('status');
        $start_date = $request->input('start_date');
        $end_date = $request->input('end_date');
        $customer_name = $request->input('customer_name');
        $phone = $request->input('phone');
        $email = $request->input('email');
 
        \Log::info('REQUEST 1:', $request->all());



        UserLog::create([
            'log_user_id' => $request->input('user_id'),
            'log_description' => 'Has been requested to avail of a membership plan.',
            'log_date' => Carbon::now(),
        ]);

        //This is working fine ...
        UserPlan::create([
            'user_id' => $user_id,
            'plan_id' => $plan_id,
            'plan_duration' => $plan_duration,
            'plan_price' => $plan_price,
            'plan_name' => $plan_name,
            'plan_description' => $plan_description,
            'payment_method' => $payment_method,
            'payment_date' => $payment_date,
            'status' => $status,
            'start_date' => $start_date,
            'end_date' => $end_date
        ]);


        $client = new Client();

        try {
            $response = $client->request('POST', 'https://api.paymongo.com/v1/payment_intents', [
                'json' => [
                    'data' => [
                        'attributes' => [
                            'amount' => $plan_price * 100, // Convert to cents
                            'payment_method_allowed' => ['gcash'],
                            'currency' => 'PHP',
                            'capture_type' => 'automatic',
                            'description' => $plan_name ." - ". $plan_duration,
                            'statement_descriptor' => 'Wellfit Fitness Gym',
                            'user_id' => $user_id,
                            'plan_id' => $plan_id,
                            'payment_date' => $payment_date,
                            'payment_method' => $payment_method,
                            'start_date' => $start_date,
                            'end_date' => $end_date,
                            'customer_name' => $customer_name,
                            'phone' => $phone,
                            'email' => $email,
                            'plan_duration' => $plan_duration,
                            'plan_price' => $plan_price,
                            'plan_name' => $plan_name,
                            'plan_description' => $plan_description,
                            'status' => $status 
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
                'redirect_url' => route('payment.step2', 
                [
                    'user_id' => $user_id,
                    'plan_id' => $plan_id,
                    'payment_date' => $payment_date,
                    'payment_method' => $payment_method,
                    'start_date' => $start_date,
                    'end_date' => $end_date,
                    'customer_name' => $customer_name,
                    'phone' => $phone,
                    'email' => $email,
                    'plan_duration' => $plan_duration,
                    'plan_price' => $plan_price,
                    'plan_name' => $plan_name,
                    'plan_description' => $plan_description,
                    'status' => $status,
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
        $user_id = $request->get('user_id');
        $plan_id = $request->get('plan_id');
        $plan_duration = $request->get('plan_duration'); 
        $plan_price = $request->get('plan_price');   
        $plan_name = $request->get('plan_name');   
        $plan_description = $request->get('plan_description'); 
        $payment_method = $request->get('payment_method');
        $payment_date = $request->get('payment_date');
        $status = $request->get('status');
        $start_date = $request->get('start_date');
        $end_date = $request->get('end_date');
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
            return redirect()->to(route('payment.step3', [
                'user_id' => $user_id,
                'plan_id' => $plan_id,
                'payment_date' => $payment_date,
                'payment_method' => $payment_method,
                'start_date' => $start_date,
                'end_date' => $end_date,
                'customer_name' => $customer_name,
                'phone' => $phone,
                'email' => $email,
                'plan_duration' => $plan_duration,
                'plan_price' => $plan_price,
                'plan_name' => $plan_name,
                'plan_description' => $plan_description,
                'status' => $status,
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
            $user_id = auth()->id();
            $plan_id = $request->plan_id;
            $plan_duration = $request->plan_duration;
            $plan_price = $request->plan_price;
            $plan_name = $request->plan_name;
            $plan_description = $request->plan_description;
            $payment_method = $request->payment_method;
            $payment_date = now();
            $status = 'pending';
            $start_date = now();
            $end_date = now()->addMonths($plan_duration);
       
            $paymentMethodId = $request->get('paymentMethodId');
            $paymentIntentId = $request->get('payment_intent');
        
            if (!$paymentIntentId || !$paymentMethodId) {
                return response()->json(['error' => 'Missing payment intent or payment method ID'], 400);
            }
    
            // Set the return URL (Ensure this route exists)
            $returnUrl = route('payment.step4');
    
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
                // UserPlan::create([
                //     'user_id' => $user_id,
                //     'plan_id' => $plan_id,
                //     'plan_duration' => $plan_duration,
                //     'plan_price' => $plan_price,
                //     'plan_name' => $plan_name,
                //     'plan_description' => $plan_description,
                //     'payment_method' => $payment_method,
                //     'payment_date' => $payment_date,
                //     'status' => 'active', // Mark as active upon success
                //     'start_date' => $start_date,
                //     'end_date' => $end_date
                // ]);
            }
     
     

            // Redirect user to the next action URL if provided by PayMongo
            if (isset($responseBody['data']['attributes']['next_action']['redirect']['url'])) {
                return redirect()->to($responseBody['data']['attributes']['next_action']['redirect']['url']);
            }
    
            // Otherwise, redirect to the return URL with payment details
            return redirect()->route('payment.step4', [
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
            return redirect()->route('member.plan.thankyou');
        }
    }
}
