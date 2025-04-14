<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FavouriteSeeder extends Seeder
{
    public function run()
    {
        // Example data for favourites
        $favourites = [
            ['id' => '1', 'user_id' => 1],
            ['id' => '2', 'user_id' => 1],
            ['id' => '3', 'user_id' => 2],
            ['id' => '4', 'user_id' => 3],
        ];

        DB::table('favourites')->insert($favourites);
    }
}