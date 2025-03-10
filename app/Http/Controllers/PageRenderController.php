<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;
use App\Models\User;
use App\Models\Plan;
use App\Models\UserPlan;
 

class PageRenderController extends Controller
{
 
    public function index(Request $request)
    {
        return Inertia::render('Index', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'reviews' => Review::getReviews(),
            'get_all_plans' => Plan::getAllPlans(),
        ]);
    }

    public function about(Request $request)
    {
        return Inertia::render('About', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
        ]);
    }

    public function plans(Request $request)
    {
        return Inertia::render('Plans', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'get_all_plans' => Plan::getAllPlans(),
        ]);
    }

    public function trainor(Request $request)
    {
        return Inertia::render('Trainor', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
        ]);
    }

    public function contact(Request $request)
    {
        return Inertia::render('Contact', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
        ]);
    }

    public function reviews(Request $request)
    {
        return Inertia::render('Reviews', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'reviews' => Review::getReviews(),
            
        ]);
    }

    public function signin(Request $request)
    {
        return Inertia::render('Signin', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
        ]);
    }

    public function signup(Request $request)
    {
        return Inertia::render('Signup', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
        ]);
    }

    public function resetPassword(Request $request)
    { 
        return Inertia::render('ResetPassword', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'email' => $request->cookie('email'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
        ]);
    }

    public function activateAccount(Request $request)
    {
        return Inertia::render('ActivateAccount', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'email' => $request->cookie('email'),
            'verification_code' => $request->cookie('verification_code'),
        ]);
    }

    public function forgot(Request $request)
    {
        return Inertia::render('Forgot', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'email' => $request->cookie('email'),
            
        ]);
    }

    public function memberIndex(Request $request)
    {
        return Inertia::render('Member/Index', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'get_all_plans' => Plan::getAllPlans(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
        ]);
    }

    public function memberAbout(Request $request)
    {
        return Inertia::render('Member/About', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
        ]);
    }


    public function memberTrainor(Request $request)
    {
        return Inertia::render('Member/Trainor', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
        ]);
    }

    public function memberContact(Request $request)
    {
        return Inertia::render('Member/Contact', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
        ]);
    }

    public function memberReviews(Request $request)
    {
        return Inertia::render('Member/Reviews', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'reviews' => Review::getReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
        ]);
    }

    public function memberProfile(Request $request)
    {
        return Inertia::render('Member/Profile', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
        ]);
    }

    public function memberPlans(Request $request)
    {
        return Inertia::render('Member/Plans', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'get_all_plans' => Plan::getAllPlans(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
            'membership_verification_code' => $request->cookie('membership_verification_code'),
        ]);
    }

    public function memberPlanForm(Request $request)
    {
        return Inertia::render('Member/Plan/Form', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'reviews' => Review::getReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
            'get_plan_by_id' => Plan::getPlanByID( $request->query('id') ),
            'membership_verification_code' => $request->cookie('membership_verification_code'),
        ]);
    }

    // public function addMembershipPlanStep1(Request $request)
    // {
    //     return Inertia::render('Member/Plan/Form', [
    //         'cu_user_id' => $request->cookie('cu_user_id'),
    //         'two_latest_reviews' => Review::getTwoLatestReviews(),
    //         'reviews' => Review::getReviews(),
    //         'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
    //         'get_plan_by_id' => Plan::getPlanByID( $request->query('id') ),
    //         'membership_verification_code' => $request->cookie('membership_verification_code'),
    //     ]);
    // }

}
