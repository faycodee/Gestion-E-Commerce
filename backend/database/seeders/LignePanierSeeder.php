<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LignePanierSeeder extends Seeder
{
    public function run()
    {
        // Sample data for ligne_panier table
        DB::table('ligne_panier')->insert([
            [
                'produit_id' => 1, // Assuming a product with ID 1 exists
                'panier_id' => 1, // Assuming a panier with ID 1 exists
            ],
            [
                'produit_id' => 2, // Assuming a product with ID 2 exists
                'panier_id' => 1, // Assuming a panier with ID 1 exists
            ],
            [
                'produit_id' => 3, // Assuming a product with ID 3 exists
                'panier_id' => 2, // Assuming a panier with ID 2 exists
            ],
        ]);
    }
}