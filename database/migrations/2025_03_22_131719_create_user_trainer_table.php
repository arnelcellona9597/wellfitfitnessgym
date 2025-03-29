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
        Schema::create('user_trainers', function (Blueprint $table) {
            $table->id();

            $table->string('trainer_user_id')->nullable();

            $table->string('trainer_id')->nullable();

            $table->string('trainer_payment_method')->nullable();
            $table->string('trainer_status')->nullable();

            $table->string('trainer_duration')->nullable();

            $table->string('trainer_start_date')->nullable();
            $table->string('trainer_end_date')->nullable();

            $table->string('trainer_time_schedule')->nullable();

            $table->string('trainer_total_price')->nullable();
            

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_trainers');
    }
};
