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

Route::get('/forgot', function () {
    return Inertia::render('Forgot');
});

Route::get('/admin', function () {
    return Inertia::render('Admin/Index');
});

Route::get('/member', function () {
    return Inertia::render('Member/Index');
});


// Route::get('/test-email', function () {
//     Mail::raw('This is a test email from Laravel.', function ($message) {
//         $message->to('arnelcellona9597@gmail.com')
//                 ->subject('SMTP Test Email');
//     });
//     return 'Test email sent!';
// });



require __DIR__.'/auth.php';
