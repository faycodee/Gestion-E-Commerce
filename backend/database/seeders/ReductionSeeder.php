<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reduction; // Import the Reduction model

class ReductionSeeder extends Seeder
{
    public function run()
    {
        Reduction::create([
            'nom' => 'Black Friday',
            'pourcentage_reduction' => '20%',
            'actif' => true,
            'periode_reduction' => '2023-11-24',
        ]);

        Reduction::create([
            'nom' => 'Cyber Monday',
            'pourcentage_reduction' => '15%',
            'actif' => true,
            'periode_reduction' => '2023-11-27',
        ]);
    }
}