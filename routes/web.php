<?php

use App\Http\Controllers\UserController;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
 
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

Route::get('/', function () {
    return Inertia::render('Index');
}); 


Route::get('/reset-password', function (Request $request) {
    return Inertia::render('ResetPassword', [
         'email' => $request->cookie('email'),
    ]);
});
Route::post('/reset-password', [UserController::class, 'resetPassword']);

Route::get('/signin', function () {
    return Inertia::render('Signin');
});
Route::post('/signin', [UserController::class, 'login']);





Route::get('/signup', function () {
    return Inertia::render('Signup');
});
Route::post('/signup', [UserController::class, 'createUser']);



Route::get('/activate-account', function (Request $request) {
    return Inertia::render('ActivateAccount', [
        'email' => $request->cookie('email'),
        'verification_code' => $request->cookie('verification_code'),
    ]);
});
Route::post('/activate-account', [UserController::class, 'activateAccount']);


Route::get('/forgot', function (Request $request) {
    return Inertia::render('Forgot', [
        'email' => $request->cookie('email'),
    ]);
});
Route::post('/forgot', [UserController::class, 'forgotPassword']);


Route::get('/about', function (Request $request) {
    return Inertia::render('About', [
        'cu_user_id' => $request->cookie('cu_user_id'),
    ]);
});

Route::get('/plans', function (Request $request) {
    return Inertia::render('Plans', [
        'cu_user_id' => $request->cookie('cu_user_id'),
    ]);
});

Route::get('/trainor', function (Request $request) {
    return Inertia::render('Trainor', [
        'cu_user_id' => $request->cookie('cu_user_id'),
    ]);
});

Route::get('/reviews', function (Request $request) {
    return Inertia::render('Reviews', [
        'cu_user_id' => $request->cookie('cu_user_id'),
    ]);
});

Route::get('/contact', function (Request $request) {
    return Inertia::render('Contact', [
        'cu_user_id' => $request->cookie('cu_user_id'),
    ]);
});


Route::get('/admin', function () {
    return Inertia::render('Admin/Index');
});

// Route::get('/member', function () {
//     return Inertia::render('Member/Index');
// });

Route::get('/member', function (Request $request) {
    return Inertia::render('Member/Index', [
        'cu_user_id' => $request->cookie('cu_user_id'),
    ]);
});





// Route::get('/test-email', function () {
//     Mail::raw('This is a test email from Laravel.', function ($message) {
//         $message->to('arnelcellona9597@gmail.com')
//                 ->subject('SMTP Test Email');
//     });
//     return 'Test email sent!';
// });



// require __DIR__.'/auth.php';
