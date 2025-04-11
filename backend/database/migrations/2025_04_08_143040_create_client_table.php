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
        Schema::create('client', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_privilege')->constrained('privilege')->onDelete('cascade');
            $table->string('nom', 50)->nullable(false);
            $table->string('prenom', 50)->nullable(false);
            $table->string('email', 50)->nullable(false);
            $table->string('adresse', 50)->nullable(false);
            $table->string('telephone', 50)->nullable(false);
            $table->string('login', 50)->nullable(false);
            $table->string('mdp', 50)->nullable(false);
            $table->date('dateC')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client');
    }
};