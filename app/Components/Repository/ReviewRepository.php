<?php 
namespace App\Components\Repository;

use App\Models\Review;
use App\Models\UserLog;
use Carbon\Carbon;

class ReviewRepository
{
    public function createReview(array $data)   
    {
        return Review::create($data);
    }
}
