<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReductionsTable extends Migration
{
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('reductions', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50);
            $table->string('pourcentage_reduction', 50);
            $table->boolean('actif');
            $table->date('periode_reduction')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reductions');
    }
}