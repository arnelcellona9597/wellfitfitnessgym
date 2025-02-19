<?php

namespace App\Components\Services\User\Impl;

use App\Components\Services\User\IReviewService;
use App\Components\Repository\ReviewRepository;

class ReviewService implements IReviewService
{
    private $reviewRepository;

    public function __construct(ReviewRepository $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }


    public function createReview(array $data)
    {
        return $this->reviewRepository->createReview( $data );
    }
 
} 