<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaiementsTable extends Migration
{
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->string('methode');
            $table->date('date_paiment');
            $table->date('updateDate')->nullable();
            $table->foreignId('facture_id')->constrained('factures')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('paiements');
    }
}