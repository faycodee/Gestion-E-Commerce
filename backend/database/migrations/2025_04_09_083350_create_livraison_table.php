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
        Schema::create('livraison', function (Blueprint $table) {
            $table->id(); // This creates the auto-incrementing 'id' column
            $table->decimal('frais_expedition', 18, 0); // 'frais_expedition' column as DECIMAL
            $table->date('date_livraison'); // 'date_livraison' column as DATE
            $table->string('nom_livreur', 50); // 'nom_livreur' column as VARCHAR(50)
            $table->string('prenom_livreur', 50); // 'prenom_livreur' column as VARCHAR(50)
            $table->string('tel_livreur', 50); // 'tel_livreur' column as VARCHAR(50)
            $table->string('email_livreur', 50); // 'email_livreur' column as VARCHAR(50)
            $table->string('ville', 50); // 'ville' column as VARCHAR(50)
            $table->string('adresse', 50); // 'adresse' column as VARCHAR(50)
            $table->string('estime_time', 50); // 'estime_time' column as VARCHAR(50)
            $table->unsignedBigInteger('id_commande'); // Foreign key referencing 'commande' table
            $table->unsignedBigInteger('id_client'); // Foreign key referencing 'client' table

            // Define foreign keys
            $table->foreign('id_commande')->references('id')->on('commande')->onDelete('cascade');
            $table->foreign('id_client')->references('id')->on('client')->onDelete('cascade');

            $table->timestamps(); // For created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livraison');
    }
};
