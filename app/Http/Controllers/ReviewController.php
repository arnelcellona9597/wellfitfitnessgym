<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Components\Services\User\IReviewService;
 
use App\Models\Review;

use Inertia\Inertia;

use Inertia\Response;


class ReviewController extends Controller
{
    //
    private $ReviewService;

    public function __construct(IReviewService $ReviewService)
    {
        $this->ReviewService = $ReviewService;
    }


    public function createReview(Request $request)
    {

        // return response()->json(['message' => 'Request data received', 'data' => $request->all()], 201);

        // Validate the request
        $validatedData = $request->validate([
            'user_id' => 'required|string',
            'rate' => 'required|string',
            'comment' => 'required|string',
        ]);

        try {
            // Pass only validated array, not the full Request object
            $this->ReviewService->createReview($validatedData);

            return response()->json(['message' => 'Review created successfully!'], 201);
        } catch (\Exception $e) {
            \Log::error('Review creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Server error, please try again later.'], 500);
        }
    }
    
    public function latestReviews(): Response
    {
        $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
            ->orderBy('reviews.created_at', 'desc')
            ->take(2)
            ->get(['reviews.*', 'users.first_name', 'users.last_name']);

        return Inertia::render('Index', [
            'reviews' => $latestReviews,
        ]);
    }

    
}



// return response()->json(['message' => 'Request data received', 'data' => $request->all()], 201);