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
        Schema::create('reduction', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50);
            $table->decimal('pourcentage_reduction', 18, 0);
            $table->string('periode_reduction', 50);
            $table->timestamps(); // Optional: Add timestamps if needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reduction');
    }
};
