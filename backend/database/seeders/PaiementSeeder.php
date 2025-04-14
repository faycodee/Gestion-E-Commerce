<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Paiement;
use App\Models\Facture;

class PaiementSeeder extends Seeder
{
    public function run()
    {
        Paiement::create([
            'methode' => 'Credit Card',
            'date_paiment' => now(),
            'updateDate' => now(),
            'facture_id' => Facture::factory()->create()->id,
        ]);

        Paiement::create([
            'methode' => 'PayPal',
            'date_paiment' => now(),
            'updateDate' => now(),
            'facture_id' => Facture::factory()->create()->id,
        ]);

        Paiement::create([
            'methode' => 'Bank Transfer',
            'date_paiment' => now(),
            'updateDate' => now(),
            'facture_id' => Facture::factory()->create()->id,
        ]);
    }
}