<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TVA;

class TVASeeder extends Seeder
{
    public function run()
    {
        TVA::create([
            'nom' => 'TVA Standard',
            'periode_TVA' => 'Mensuel',
            'taux' => 20.00,
        ]);

        TVA::create([
            'nom' => 'TVA Réduit',
            'periode_TVA' => 'Trimestriel',
            'taux' => 5.50,
        ]);
    }
}