<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturesTable extends Migration
{
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->date('date_facturation');
            $table->decimal('montant_HT', 15, 2);
            $table->decimal('montant_TTC', 15, 2);
            $table->decimal('montant_TVA', 15, 2);
            $table->string('payment_status', 250);
            $table->foreignId('commande_id')->constrained('commandes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('factures');
    }
}