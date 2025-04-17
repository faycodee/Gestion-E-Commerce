<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 50);
            $table->string('name', 250);
            $table->string('role', 100);
            $table->string('email', 50)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 60);
            $table->string('tele', 20)->nullable(); // Ajout de la colonne téléphone
            $table->string('adresse', 250)->nullable();
            $table->timestamps();
        });
    }



    public function down()
    {
        Schema::dropIfExists('users');
    }
}