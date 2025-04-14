<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProduitSeeder extends Seeder
{
    public function run()
    {
        DB::table('produits')->insert([
            [
                'nom' => 'Produit 1',
                'description' => 'Description du produit 1',
                'prix_HT' => 100.00,
                'quantity' => 10,
                'image' => 'image1.jpg',
                'category_id' => 1,
                'tva_id' => 1, // Matches a valid tva_id from TVASeeder
            ],
            [
                'nom' => 'Produit 2',
                'description' => 'Description du produit 2',
                'prix_HT' => 200.00,
                'quantity' => 5,
                'image' => 'image2.jpg',
                'category_id' => 2,
                'tva_id' => 1, // Matches a valid tva_id from TVASeeder
            ],
            [
                'nom' => 'Produit 3',
                'description' => 'Description du produit 3',
                'prix_HT' => 150.00,
                'quantity' => 20,
                'image' => 'image3.jpg',
                'category_id' => 1,
                'tva_id' => 2, // Matches a valid tva_id from TVASeeder
            ],
        ]);
    }
}