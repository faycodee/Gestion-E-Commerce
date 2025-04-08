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
        Schema::create('produit_image', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50);
            $table->string('url', 255);
            $table->unsignedBigInteger('id_produit');
            
            // Foreign key constraint
            $table->foreign('id_produit')->references('id')->on('produit')->onDelete('cascade');
            
            $table->timestamps(); // Optional: Add timestamps if needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produit_image');
    }
};
