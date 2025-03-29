<?php

use App\Http\Controllers\PageRenderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController; 
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TrainerPaymentController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
 
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

// MEMBER
Route::get('/', [PageRenderController::class, 'index']);
Route::get('/about', [PageRenderController::class, 'about']);
Route::get('/plans', [PageRenderController::class, 'plans']);
Route::get('/trainor', [PageRenderController::class, 'trainor']);
Route::get('/contact', [PageRenderController::class, 'contact']);
Route::get('/reviews', [PageRenderController::class, 'reviews']);
Route::get('/signin', [PageRenderController::class, 'signin']);
Route::get('/signup', [PageRenderController::class, 'signup']);
Route::get('/reset-password', [PageRenderController::class, 'resetPassword']);
Route::get('/activate-account', [PageRenderController::class, 'activateAccount']);
Route::get('/forgot', [PageRenderController::class, 'forgot']); 

Route::get('/member', [PageRenderController::class, 'memberIndex'])->name("member.index");
Route::get('/member/about', [PageRenderController::class, 'memberAbout']);
Route::get('/member/plans', [PageRenderController::class, 'memberPlans']);
Route::get('/member/trainor', [PageRenderController::class, 'memberTrainor']);
Route::get('/member/contact', [PageRenderController::class, 'memberContact']);
Route::get('/member/reviews', [PageRenderController::class, 'memberReviews']);
Route::get('/member/profile', [PageRenderController::class, 'memberProfile']);
Route::get('/member/plan/form', [PageRenderController::class, 'memberPlanForm']);
Route::get('/gcash-payment/step2', [PaymentController::class, 'createPaymentMethod'])->name('payment.step2');
Route::get('/gcash-payment/step3', [PaymentController::class, 'attachPaymentMethod'])->name('payment.step3');
Route::get('/gcash-payment/step4', [PaymentController::class, 'handlePaymentStatus'])->name('payment.step4');
Route::get('/member/plan/thank-you', [PageRenderController::class, 'memberPlanThankYou'])->name('member.plan.thankyou');
Route::get('/member/account-history', [PageRenderController::class, 'memberAccountHistory']);
Route::get('/member/account-history/membership', [PageRenderController::class, 'memberAccountHistoryMembership']);
Route::get('/member/trainor', [PageRenderController::class, 'MemberTrainer']);
Route::get('/member/trainor/form', [PageRenderController::class, 'memberTrainorForm']);


Route::get('/trainer-gcash-payment/step2', [TrainerPaymentController::class, 'createPaymentMethod'])->name('trainerpayment.step2');
Route::get('/trainer-gcash-payment/step3', [TrainerPaymentController::class, 'attachPaymentMethod'])->name('trainerpayment.step3');
Route::get('/trainer-gcash-payment/step4', [TrainerPaymentController::class, 'handlePaymentStatus'])->name('trainerpayment.step4');
Route::get('/member/trainor/thank-you', [PageRenderController::class, 'memberTrainorThankYou'])->name('member.trainer.thankyou');

Route::get('/member/account-history/trainor', [PageRenderController::class, 'memberAccountHistoryBookTrainor']);

Route::post('/signin', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'createUser']);
Route::post('/reset-password', [UserController::class, 'resetPassword']);
Route::post('/activate-account', [UserController::class, 'activateAccount']);
Route::post('/forgot', [UserController::class, 'forgotPassword']);
Route::post('/member/contact', [UserController::class, 'contactForm']);
Route::post('/contact', [UserController::class, 'contactForm']);
Route::post('/member/account-history/member-plan-cancel', [UserController::class, 'MemberPlanCancel']);
Route::post('/member/account-history/member-plan-delete', [UserController::class, 'MemberPlanDelete']);

Route::post('/member/account-history/member-booktrainor-cancel', [UserController::class, 'BookTrainorCancel']);
Route::post('/member/account-history/member-booktrainor-delete', [UserController::class, 'BookTrainorDelete']);

Route::post('/member/reviews', [ReviewController::class, 'createReview']);
Route::post('/member/profile', [UserController::class, 'updateMemberProfile']);
Route::post('/member/plan/form', [UserController::class, 'addMembershipPlanStep']);
Route::post('/gcash-payment', [PaymentController::class, 'createPaymentIntent']);
Route::post('/over-the-counter-payment', [PaymentController::class, 'overTheCounterPayment']);
Route::post('/member/trainor/form', [UserController::class, 'trainorConfirmationStepNav']);
Route::post('/trainer-over-the-counter-payment', [TrainerPaymentController::class, 'trainerOverTheCounterPayment']);
Route::post('/trainer-gcash-payment', [TrainerPaymentController::class, 'createPaymentIntent']);
 
// ADMINISTRATOR
Route::get('/admin', [PageRenderController::class, 'adminIndex'])->name("admin.index");