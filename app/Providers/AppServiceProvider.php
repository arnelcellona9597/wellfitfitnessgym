<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Components\Services\User\IUserService;
use App\Components\Services\User\Impl\UserService;
use App\Components\Repository\UserRepository;

use App\Components\Services\User\IReviewService;
use App\Components\Services\User\Impl\ReviewService;
use App\Components\Repository\ReviewRepository;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->singleton(IUserService::class, function ($app) {
            return new UserService($app->make(UserRepository::class));
        });

        $this->app->singleton(IReviewService::class, function ($app) {
            return new ReviewService($app->make(ReviewRepository::class));
        });
    }
}
