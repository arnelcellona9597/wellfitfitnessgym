<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_plans', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->nullable();
            $table->string('plan_id')->nullable();
            $table->string('start_date')->nullable();
            $table->string('end_date')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('status')->nullable();
            $table->string('payment_date')->nullable();

            $table->string('plan_duration')->nullable();
            $table->string('plan_price')->nullable();
            $table->string('plan_name')->nullable();
            $table->string('plan_description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_plans');
    }
};
