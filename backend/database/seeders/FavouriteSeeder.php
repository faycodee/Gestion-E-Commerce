<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FavouriteSeeder extends Seeder
{
    public function run()
    {
        // Example data for favourites
  
        DB::table('favourites')->insert([
            ['user_id' => 1],
            ['user_id' => 1],
            ['user_id' => 2],
            ['user_id' => 3],
        ]);

        
    }
}