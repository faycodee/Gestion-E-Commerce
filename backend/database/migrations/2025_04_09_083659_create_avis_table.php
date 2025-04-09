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
        Schema::create('avis', function (Blueprint $table) {
            $table->id(); // Creates the auto-incrementing 'id' column
            $table->integer('note'); // 'note' column as INT
            $table->text('commentaire'); // 'commentaire' column as TEXT
            $table->unsignedBigInteger('id_client'); // Foreign key referencing 'client' table
            $table->unsignedBigInteger('id_produit'); // Foreign key referencing 'produit' table

            // Define foreign keys
            $table->foreign('id_client')->references('id')->on('client')->onDelete('cascade');
            $table->foreign('id_produit')->references('id')->on('produit')->onDelete('cascade');

            $table->timestamps(); // For created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avis');
    }
};
