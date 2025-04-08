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
        Schema::create('sous_categorie_image', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50);
            $table->string('url', 255);
            $table->unsignedBigInteger('id_sous_categorie');
            $table->foreign('id_sous_categorie')->references('id')->on('sous_categorie')->onDelete('cascade');
            $table->timestamps(); // Optional: Add timestamps if needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sous_categorie_image');
    }
};
