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
        Schema::create('faq', function (Blueprint $table) {
            $table->id(); // Creates the auto-incrementing 'ID' column
            $table->text('Question'); // 'Question' column as TEXT
            $table->text('Réponse'); // 'Réponse' column as TEXT
            $table->string('Catégorie'); // 'Catégorie' column as VARCHAR(255)
            $table->integer('Nombre_vues')->default(0); // 'Nombre_vues' column with a default value of 0

            $table->timestamps(); // For created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faq');
    }
};
