<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LigneCommande;

class LigneCommandeSeeder extends Seeder
{
    public function run()
    {
        // Generate 10 random LigneCommande records
        LigneCommande::factory(10)->create();
    }
}
