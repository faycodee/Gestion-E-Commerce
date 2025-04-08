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
        Schema::create('code_postal', function (Blueprint $table) {
            $table->id(); // id INT AUTO_INCREMENT PRIMARY KEY
            $table->integer('code_postal')->nullable(false); // NOT NULL
            $table->unsignedBigInteger('id_ville'); // clé étrangère

            // Définir la contrainte de clé étrangère
            $table->foreign('id_ville')->references('id')->on('ville')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('code_postal');
    }
};
