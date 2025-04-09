<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;
use App\Models\User;
use App\Models\Plan;
use App\Models\UserPlan;
use App\Models\Trainer;
use App\Models\UserTrainer;
use App\Models\Inventory;
use App\Models\Gallery;


use Illuminate\Support\Facades\Log;

class PageRenderController extends Controller
{
 
    public function index(Request $request)
    {
        return Inertia::render('Index', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'reviews' => Review::getReviews(),
            'get_all_plans' => Plan::getAllPlans(),
            'trainers' => Trainer::trainers(),  
            'get_all_inventory_items' => Inventory::getAllInventoryItems(),
            'get_all_images' => Gallery::getAllGalleryImages(),
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
            'trainers' => Trainer::trainers(),  
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
            'trainers' => Trainer::trainers(),  
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
            'trainers' => Trainer::trainers(),  
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

    public function memberPlanThankYou(Request $request)
    {
        return Inertia::render('Member/Plan/ThankYou', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')), 
            'get_all_plans' => Plan::getAllPlans(),
            'get_user_latest_membership' => UserPlan::getUserLatestMembership($request->cookie('cu_user_id')),
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
 
    public function memberAccountHistory(Request $request)
    {
        return Inertia::render('Member/AccountHistory', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'reviews' => Review::getReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
            'get_user_membership' => UserPlan::getUserMembership($request->cookie('cu_user_id')),
            'get_user_booktrainor' => UserTrainer::getUserBookTrainor($request->cookie('cu_user_id')),
        ]);
    }

    public function memberAccountHistoryMembership(Request $request)
    {
        return Inertia::render('Member/AccountHistory/Membership', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'reviews' => Review::getReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
            'get_membership_by_id' => UserPlan::getMembershipByID($request->query('id')),
        ]); 
    }
    


    public function MemberTrainer(Request $request)
    {
        return Inertia::render('Member/Trainor', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'reviews' => Review::getReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
            'trainers' => Trainer::trainers(),  
        ]);
    }
    
    public function memberTrainorForm(Request $request)
    {
        return Inertia::render('Member/Trainor/Form', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'reviews' => Review::getReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
            'trainers' => Trainer::trainers(),  
            'get_trainer_by_id' => Trainer::getTrainerByID( $request->query('id') ),
        ]);
    }
    

    

    public function memberTrainorThankYou(Request $request)
    {
        return Inertia::render('Member/Trainor/ThankYou', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')), 
            'get_all_plans' => Plan::getAllPlans(),
            'get_user_latest_membership' => UserPlan::getUserLatestMembership($request->cookie('cu_user_id')),
            'get_user_latest_booktrainor'  => UserTrainer::getUserLatestBookTrainor($request->cookie('cu_user_id')),
            'get_trainer_by_id' => Trainer::getTrainerByID( $request->query('id') ),
            
        ]);
    }


    public function memberAccountHistoryBookTrainor(Request $request)
    {
        return Inertia::render('Member/AccountHistory/BookTrainor', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'two_latest_reviews' => Review::getTwoLatestReviews(),
            'reviews' => Review::getReviews(),
            'get_user_info' => User::getUserInfo($request->cookie('cu_user_id')),
            'get_membership_by_id' => UserPlan::getMembershipByID($request->query('id')),
            'get_user_latest_booktrainor'  => UserTrainer::getUserLatestBookTrainor($request->cookie('cu_user_id')),
            'get_trainer_by_id' => Trainer::getTrainerByID( $request->query('id') ),
            'get_booktrainer_by_id' => UserTrainer::getBookTrainorByID( $request->query('id') ),
            
        ]); 
    }
 
 
    
    public function adminIndex(Request $request)
    {
        return Inertia::render('Admin/Index', [
            'cu_user_id' => $request->cookie('cu_user_id'),
        ]);
    }


    public function adminMembershipAvailMembershipPlan(Request $request)
    {
        return Inertia::render('Admin/Membership/AvailMembershipPlan', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'all_users' => User::users(),
            'get_all_plans' => Plan::getAllPlans(),
        ]);
    }

    public function adminMembershipListOfMembers(Request $request)
    {
        return Inertia::render('Admin/Membership/ListOfMembers', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'get_all_members' =>  UserPlan::getAllMembers(),
            'get_all_plans' => Plan::getAllPlans(),
        ]);
    }


    public function adminViewMembershipDetails(Request $request)
    {
        return Inertia::render('Admin/Membership/ViewMembershipDetails', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'get_membership_by_id' => UserPlan::getMembershipByID($request->query('id')),
        ]);
    }

    public function adminListOfMembershipPlan(Request $request)
    {
        return Inertia::render('Admin/Membership/ListOfMembershipPlan', [
            'cu_user_id' => $request->cookie('cu_user_id'),
            'get_all_plans' => Plan::getAllPlans(),
       
        ]);
    }
    

    public function adminAddPlan(Request $request)
    {
        return Inertia::render('Admin/Membership/AddPlan', [
            'cu_user_id' => $request->cookie('cu_user_id'),

        ]);
    }


    public function adminAddTrainor(Request $request)
    {
        return Inertia::render('Admin/BookTrainor/AddTrainor', [
            'cu_user_id' => $request->cookie('cu_user_id'), 
        ]);
    }


    
    
    public function adminBookingTrainer(Request $request)
    {
        return Inertia::render('Admin/BookTrainor/AddBooking', [
            'cu_user_id' => $request->cookie('cu_user_id'), 
            'all_users' => User::users(),
            'trainers' => Trainer::trainers(),  
        ]);
    }
    
    
    public function adminBookingList(Request $request)
    {
        return Inertia::render('Admin/BookTrainor/ListOfBookings', [
            'cu_user_id' => $request->cookie('cu_user_id'), 
            'get_all_user_booktrainor' => UserTrainer::getAllUserBookTrainor(),
        ]);
    }


    public function adminViewBookingDetails(Request $request)
    {
        return Inertia::render('Admin/BookTrainor/ViewBookingDetails', [
            'cu_user_id' => $request->cookie('cu_user_id'), 
            'get_booktrainer_by_id' => UserTrainer::getBookTrainorByID( $request->query('id') ),
        ]);
    }


    public function adminTrainerList(Request $request)
    {
        return Inertia::render('Admin/BookTrainor/ListOfTrainers', [
            'cu_user_id' => $request->cookie('cu_user_id'), 
            'get_all_user_booktrainor' => UserTrainer::getAllUserBookTrainor(),
            'trainers' => Trainer::trainers(),  
        ]);
    }
 
 
    public function adminAddItem(Request $request)
    {
        return Inertia::render('Admin/Inventory/AddItem', [
            'cu_user_id' => $request->cookie('cu_user_id'), 
        ]);
    }

    public function adminAddInventory(Request $request)
    {
        return Inertia::render('Admin/Inventory/ListItem', [
            'cu_user_id' => $request->cookie('cu_user_id'), 
            'get_all_inventory_items' => Inventory::getAllInventoryItems(),
        ]);
    }


    public function adminGalleryAdd(Request $request)
    {
        return Inertia::render('Admin/Gallery/AddImage', [
            'cu_user_id' => $request->cookie('cu_user_id'), 
        ]); 
    }

    public function adminGalleryList(Request $request)
    {
        return Inertia::render('Admin/Gallery/ListImage', [
            'cu_user_id' => $request->cookie('cu_user_id'), 
            'get_all_images' => Gallery::getAllGalleryImages(),
        ]); 
    }

    public function adminReviews(Request $request)
    {
        return Inertia::render('Admin/Reviews/Reviews', [
            'cu_user_id' => $request->cookie('cu_user_id'), 
            'reviews' => Review::getReviews(),
        ]); 
    }
    

}
