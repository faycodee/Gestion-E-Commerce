<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLivraisonsTable extends Migration
{
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('livraisons', function (Blueprint $table) {
            $table->id();
            $table->decimal('frais_expedition', 15, 2);
            $table->string('nom_transporteur', 50);
            $table->date('date_envoi');
            $table->string('URL_suivi', 50);
            $table->decimal('poid', 15, 2);
            $table->string('estime_arrive', 50);
            $table->foreignId('commande_id')->constrained('commandes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('livraisons');
    }
}