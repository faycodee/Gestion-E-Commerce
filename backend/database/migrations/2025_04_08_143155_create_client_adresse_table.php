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
        Schema::create('client_adresse', function (Blueprint $table) {
            $table->id(); // id INT AUTO_INCREMENT PRIMARY KEY
            $table->string('rue', 50)->nullable(false);
            $table->foreignId('id_client')->constrained('client')->onDelete('cascade'); // Clé étrangère vers client(id)
            $table->foreignId('id_ville')->constrained('ville')->onDelete('cascade'); // Clé étrangère vers ville(id)
            $table->string('prenom', 50)->nullable(false);
            $table->string('nom_famile', 50)->nullable(false);
            $table->string('ligne1', 50)->nullable(false);
            $table->integer('numero')->nullable(false);
            $table->date('createdDate')->nullable(false);
            $table->date('updateDate')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_adresse');
    }
};
