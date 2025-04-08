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
        Schema::create('facture', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 50);
            $table->decimal('montant_ht', 18, 0);
            $table->decimal('montant_ttc', 18, 0);
            $table->date('date');
            $table->date('updatedate');
            $table->unsignedBigInteger('id_commande');
            $table->unsignedBigInteger('id_client');
            
            // Foreign key constraints
            $table->foreign('id_commande')->references('id')->on('commande')->onDelete('cascade');
            $table->foreign('id_client')->references('id')->on('client')->onDelete('cascade');
            
            $table->timestamps(); // Optional: Add timestamps if needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facture');
    }
};
