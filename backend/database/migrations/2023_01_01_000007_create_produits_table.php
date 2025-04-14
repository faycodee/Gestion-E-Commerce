<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduitsTable extends Migration
{
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50);
            $table->string('description', 50);
            $table->decimal('prix_HT', 15, 2);
            $table->integer('quantity');
            $table->string('image', 250);
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('tva_id')->constrained('tvas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('produits');
    }
}