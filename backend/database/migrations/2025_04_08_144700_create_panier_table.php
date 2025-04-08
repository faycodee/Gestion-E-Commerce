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
        Schema::create('panier', function (Blueprint $table) {
            $table->id();
            $table->decimal('montant', 18, 0);
            $table->date('createddate');
            $table->date('updateddate');
            $table->unsignedBigInteger('id_client');
            
            // Foreign key constraint
            $table->foreign('id_client')->references('id')->on('client')->onDelete('cascade');
            
            $table->timestamps(); // Optional: Add timestamps if needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('panier');
    }
};
