<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Caracteristique;

class CaracteristiqueSeeder extends Seeder
{
    public function run()
    {
        Caracteristique::create([
            'couleur' => 'Red',
            'taille' => 'M',
            'produit_id' => 1, // Adjust the product ID as necessary
        ]);

        Caracteristique::create([
            'couleur' => 'Blue',
            'taille' => 'L',
            'produit_id' => 2, // Adjust the product ID as necessary
        ]);

        Caracteristique::create([
            'couleur' => 'Green',
            'taille' => 'S',
            'produit_id' => 3, // Adjust the product ID as necessary
        ]);

        // Add more entries as needed
    }
}