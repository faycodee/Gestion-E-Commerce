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
        Schema::create('ligne_panier', function (Blueprint $table) {
            $table->id();
            $table->integer('quantite');
            $table->decimal('prix_unitaire', 18, 0);
            $table->unsignedBigInteger('id_produit');
            $table->unsignedBigInteger('id_panier');
            
            // Foreign key constraints
            $table->foreign('id_produit')->references('id')->on('produit')->onDelete('cascade');
            $table->foreign('id_panier')->references('id')->on('panier')->onDelete('cascade');
            
            $table->timestamps(); // Optional: Add timestamps if needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ligne_panier');
    }
};
