<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReductionProduitSeeder extends Seeder
{
    public function run()
    {
        DB::table('reduction_produit')->insert([
            [
                'produit_id' => 1,
                'reduction_id' => 1, // Matches a valid reduction_id from ReductionSeeder
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'produit_id' => 2,
                'reduction_id' => 1, // Matches a valid reduction_id from ReductionSeeder
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'produit_id' => 3,
                'reduction_id' => 2, // Matches a valid reduction_id from ReductionSeeder
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}