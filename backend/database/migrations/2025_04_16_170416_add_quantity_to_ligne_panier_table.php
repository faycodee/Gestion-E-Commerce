<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddQuantityToLignePanierTable extends Migration
{
    public function up()
    {
        Schema::table('ligne_panier', function (Blueprint $table) {
            $table->integer('quantity')->default(1)->after('panier_id'); // Add quantity column with a default value of 1
        });
    }

    public function down()
    {
        Schema::table('ligne_panier', function (Blueprint $table) {
            $table->dropColumn('quantity');
        });
    }
}