<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateDescriptionLengthInProduitsTable extends Migration
{
    public function up()
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->text('description')->change(); // Change to text for longer descriptions
        });
    }

    public function down()
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->string('description', 255)->change(); // Revert back to original length
        });
    }
}