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
        Schema::create('ligne_livraison', function (Blueprint $table) {
            $table->id(); // Creates the auto-incrementing 'id' column
            $table->unsignedBigInteger('id_produit'); // Foreign key referencing 'produit' table
            $table->unsignedBigInteger('id_livraison'); // Foreign key referencing 'livraison' table
            $table->integer('Quantite'); // 'Quantite' column as INT

            // Define foreign keys
            $table->foreign('id_produit')->references('id')->on('produit')->onDelete('cascade');
            $table->foreign('id_livraison')->references('id')->on('livraison')->onDelete('cascade');

            $table->timestamps(); // For created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ligne_livraison');
    }
};
