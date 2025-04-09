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
        Schema::create('produit', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50);
            $table->unsignedBigInteger('id_categorie');
            $table->string('description', 255);
            $table->decimal('prix', 18, 0);
            $table->integer('stock_min');
            $table->date('date');
            $table->unsignedBigInteger('id_tva');
            $table->unsignedBigInteger('id_reduction');
            $table->unsignedBigInteger('id_fournisseur');
            // Foreign key constraints
            $table->foreign('id_categorie')->references('id')->on('categorie')->onDelete('cascade');
            $table->foreign('id_tva')->references('id')->on('tva')->onDelete('cascade');
            $table->foreign('id_reduction')->references('id')->on('reduction')->onDelete('cascade');
            $table->foreign('id_fournisseur')->references('id')->on('fournisseur')->onDelete('cascade');
            
            $table->timestamps(); // Optional: Add timestamps if needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produit');
    }
};
