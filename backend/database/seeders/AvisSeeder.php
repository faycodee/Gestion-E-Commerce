<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Avis;
use App\Models\User;
use App\Models\Produit;

class AvisSeeder extends Seeder
{
    public function run()
    {
        // Create 10 avis records
        for ($i = 0; $i < 10; $i++) {
            Avis::create([
                'notation' => rand(1, 5), // Random notation between 1 and 5
                'avis' => 'This is a sample review ' . $i,
                'titre' => 'Review Title ' . $i,
                'user_id' => User::inRandomOrder()->first()->id, // Random user
                'produit_id' => Produit::inRandomOrder()->first()->id, // Random product
            ]);
        }
    }
}