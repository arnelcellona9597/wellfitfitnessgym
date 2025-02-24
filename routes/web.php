<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PaymentController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

use App\Models\Review;
use Illuminate\Support\Facades\DB;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Index');
// }); 

 

// Route::get('/', function (Request $request) {

//     // $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
//     // ->orderBy('reviews.created_at', 'desc')
//     // ->take(2)
//     // ->get(['reviews.*', 'users.first_name', 'users.last_name']);

//     return Inertia::render('Index', [
//         // 'reviews' => $latestReviews,
//         'reviews' => [ReviewController::class, 'readReviews']
//    ]);
// })->name('home');

Route::get('/', [ReviewController::class, 'latestReviews'])->name('home');


Route::get('/reset-password', function (Request $request) {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('ResetPassword', [
         'email' => $request->cookie('email'),
         'reviews' => $latestReviews,
    ]);
});
Route::post('/reset-password', [UserController::class, 'resetPassword']);

Route::get('/signin', function () {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('Signin', [
        'reviews' => $latestReviews,
   ]);
});
Route::post('/signin', [UserController::class, 'login']);


Route::get('/signup', function () {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('Signup', [
        'reviews' => $latestReviews,
   ]);
});
Route::post('/signup', [UserController::class, 'createUser']);



Route::get('/activate-account', function (Request $request) {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('ActivateAccount', [
        'email' => $request->cookie('email'),
        'verification_code' => $request->cookie('verification_code'),
        'reviews' => $latestReviews,
    ]);
});
Route::post('/activate-account', [UserController::class, 'activateAccount']);


Route::get('/forgot', function (Request $request) {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('Forgot', [
        'email' => $request->cookie('email'),
        'reviews' => $latestReviews,
    ]);
});
Route::post('/forgot', [UserController::class, 'forgotPassword']);


Route::get('/about', function (Request $request) {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('About', [
        'cu_user_id' => $request->cookie('cu_user_id'),
        'reviews' => $latestReviews,
    ]);
});

Route::get('/plans', function (Request $request) {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('Plans', [
        'cu_user_id' => $request->cookie('cu_user_id'),
        'reviews' => $latestReviews,
    ]);
});

Route::get('/trainor', function (Request $request) {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('Trainor', [
        'cu_user_id' => $request->cookie('cu_user_id'),
        'reviews' => $latestReviews,
    ]);
});

Route::get('/reviews', function (Request $request) {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('Reviews', [
        'cu_user_id' => $request->cookie('cu_user_id'),
        'reviews' => $latestReviews,
    ]);
});

Route::get('/contact', function (Request $request) {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('Contact', [
        'cu_user_id' => $request->cookie('cu_user_id'),
        'reviews' =>$latestReviews,
    ]);
});
Route::post('/contact', [UserController::class, 'contactForm']);

Route::get('/admin', function () {
    return Inertia::render('Admin/Index');
});

 

Route::get('/member', function (Request $request) {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('Member/Index', [
        'cu_user_id' => $request->cookie('cu_user_id'),
        'reviews' =>$latestReviews,
    ]);
});

Route::get('/member/contact', function (Request $request) {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('Member/Contact', [
        'cu_user_id' => $request->cookie('cu_user_id'),
        'reviews' => $latestReviews,
    ]);
});
Route::post('/member/contact', [UserController::class, 'contactForm']);


Route::get('/member/reviews', function (Request $request) {
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('Member/Reviews', [
        'cu_user_id' => $request->cookie('cu_user_id'),
        'reviews' => $latestReviews,
    ]);
 });
Route::post('/member/reviews', [ReviewController::class, 'createReview']);
 
Route::get('/member/reviews', function (Request $request) {
    
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);

    return Inertia::render('Member/Reviews', [
        'cu_user_id' => $request->cookie('cu_user_id'),
        'reviews' => $latestReviews,
    ]);
});

Route::get('/gcash-payment', function () {
    
    $latestReviews = Review::leftJoin('users', 'reviews.user_id', '=', 'users.id')
    ->orderBy('reviews.created_at', 'desc')
    ->take(2)
    ->get(['reviews.*', 'users.first_name', 'users.last_name']);
    return Inertia::render('GcashPayment', [
        'reviews' => $latestReviews,
   ]);
});

Route::post('/gcash-payment', [PaymentController::class, 'createPaymentIntent']);
Route::get('/gcash-payment/step2', [PaymentController::class, 'createPaymentMethod'])->name('payment.step2');
Route::get('/gcash-payment/step3', [PaymentController::class, 'attachPaymentMethod'])->name('payment.step3');
Route::get('/gcash-payment/step4', [PaymentController::class, 'handlePaymentStatus'])->name('payment.step4');