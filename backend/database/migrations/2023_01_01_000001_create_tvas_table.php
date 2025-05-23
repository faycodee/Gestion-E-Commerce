<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTvasTable extends Migration
{
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('tvas', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50);
            $table->string('periode_TVA', 50);
            $table->decimal('taux', 25, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tvas');
    }
}
