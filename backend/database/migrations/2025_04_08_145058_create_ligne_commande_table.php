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
        Schema::create('ligne_commande', function (Blueprint $table) {
            $table->id();
            $table->integer('quantite');
            $table->decimal('prix_unitaire', 18, 0);
            $table->unsignedBigInteger('id_commande');
            $table->unsignedBigInteger('id_produit');
            
            // Foreign key constraints
            $table->foreign('id_commande')->references('id')->on('commande')->onDelete('cascade');
            $table->foreign('id_produit')->references('id')->on('produit')->onDelete('cascade');
            
            $table->timestamps(); // Optional: Add timestamps if needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ligne_commande');
    }
};
