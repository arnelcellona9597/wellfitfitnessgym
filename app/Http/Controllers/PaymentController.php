<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {

        $order_total = $request->input('order_total');   
        $plan_name = $request->input('plan_name');   
        $duration = $request->input('duration'); 
 

        $client = new Client();

        try {
            $response = $client->request('POST', 'https://api.paymongo.com/v1/payment_intents', [
                'json' => [
                    'data' => [
                        'attributes' => [
                            'amount' => $order_total * 100, // Convert to cents
                            'payment_method_allowed' => ['gcash'],
                            'currency' => 'PHP',
                            'capture_type' => 'automatic',
                            'description' => $plan_name ." - ". $duration,
                            'statement_descriptor' => 'Wellfit Fitness Gym'
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
                'message' => 'Payment intent created successfully. Please proceed to step 2.',
                'redirect_url' => route('payment.step2', ['payment_intent' => $paymentIntentId])
            ]);

        } catch (\Exception $e) {
            \Log::error('Payment initiation failed: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function createPaymentMethod(Request $request)
    {
        // \Log::info('Received Data:', $request->all()); // Log incoming request data

        // $customer_name = $request->input('customer_name');
        // $phone = $request->input('phone');
        // $email = $request->input('email');

        $customer_name = "John Doe";
        $email = "arnelcellona9597@gmail.com";
        $phone = "09514874304";


        // Dummy user data for testing
        $dummyUser = [
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
        $paymentIntentId = $request->get('payment_intent');

        try {
            $response = $client->request('POST', 'https://api.paymongo.com/v1/payment_methods', [
                'json' => [
                    'data' => [
                        'attributes' => [
                            'billing' => [
                                'address' => [
                                    'line1' => $dummyUser['address']['line1'],
                                    'city' => $dummyUser['address']['city'],
                                    'state' => $dummyUser['address']['state'],
                                    'postal_code' => $dummyUser['address']['postal_code'],
                                    'country' => 'PH',
                                ],
                                'name' => $dummyUser['name'],
                                'email' => $dummyUser['email'],
                                'phone' => $dummyUser['phone'],
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
                'payment_intent' => $paymentIntentId,
                'payment_method' => $paymentMethodId
            ])); // Redirect directly to step 3

        } catch (\Exception $e) {
            \Log::error('Payment method creation failed: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()]);
        }
    }


    public function attachPaymentMethod(Request $request)
    {
        $client = new Client();
        $paymentIntentId = $request->get('payment_intent');
        $paymentMethodId = $request->get('payment_method');

        try {
            $response = $client->request('POST', 'https://api.paymongo.com/v1/payment_intents/' . $paymentIntentId . '/attach', [
                'json' => [
                    'data' => [
                        'attributes' => [
                            'payment_method' => $paymentMethodId,
                            'return_url' => route('payment.step4'), // This is where PayMongo will redirect after processing the payment
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
            
            // Log the response for debugging
            \Log::info('PayMongo attach response: ' . json_encode($responseBody));

            // Check if a redirect URL is returned, meaning the payment requires further action
            if (isset($responseBody['data']['attributes']['next_action']['redirect']['url'])) {
                return redirect()->to($responseBody['data']['attributes']['next_action']['redirect']['url']);
            }

            // If no redirect URL is required, handle payment confirmation (success or failure)
            return redirect()->route('payment.step4', ['payment_intent' => $paymentIntentId]);

        } catch (\Exception $e) {
            \Log::error('Payment method attachment failed: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function handlePaymentStatus(Request $request)
    {
        $client = new Client();
        $paymentIntentId = $request->get('payment_intent'); // Payment intent ID passed from step 3

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
            return redirect()->route('member.index');
        }
    }
}
