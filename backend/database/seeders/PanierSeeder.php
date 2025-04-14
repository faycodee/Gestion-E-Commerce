<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Panier;
use App\Models\User;

class PanierSeeder extends Seeder
{
    public function run()
    {
        // Create 10 sample paniers for demonstration
        for ($i = 1; $i <= 10; $i++) {
            Panier::create([
                'montant' => rand(100, 1000), // Random montant between 100 and 1000
                'user_id' => User::inRandomOrder()->first()->id, // Assign a random user
            ]);
        }
    }
}