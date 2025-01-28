<?php

use App\Http\Controllers\UserController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('/', function () {
    return Inertia::render('Index');
});

Route::get('/signin', function () {
    return Inertia::render('Signin');
});

Route::get('/signup', function () {
    return Inertia::render('Signup');
});

Route::post('/signup', [UserController::class, 'createUser']);

Route::get('/forgot', function () {
    return Inertia::render('Forgot');
});

Route::get('/admin', function () {
    return Inertia::render('Admin/Index');
});

Route::get('/member', function () {
    return Inertia::render('Member/Index');
});

require __DIR__.'/auth.php';
