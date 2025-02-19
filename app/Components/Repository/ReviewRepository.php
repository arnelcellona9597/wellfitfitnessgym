<?php 
namespace App\Components\Repository;

use App\Models\Review;

class ReviewRepository
{
    public function createReview(array $data)   
    {
        return Review::create($data);
    }
}
