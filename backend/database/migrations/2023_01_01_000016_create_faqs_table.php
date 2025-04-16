<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFaqsTable extends Migration
{
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('faqs', function (Blueprint $table) {
            $table->id('Id_FAQ');
            $table->string('Question', 255); // Increased length to 255
            $table->string('Reponde', 255);  // Increased length to 255
            $table->string('categorie', 50);
            $table->integer('Nombre_vues')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('faqs');
    }
}