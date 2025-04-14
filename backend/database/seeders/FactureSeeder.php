<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FactureSeeder extends Seeder
{
    public function run()
    {
        DB::table('factures')->insert([
            [
                'date_facturation' => now(),
                'montant_HT' => 100.00,
                'montant_TTC' => 120.00,
                'montant_TVA' => 20.00,
                'payment_status' => 'Paid',
                'commande_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'date_facturation' => now(),
                'montant_HT' => 200.00,
                'montant_TTC' => 240.00,
                'montant_TVA' => 40.00,
                'payment_status' => 'Pending',
                'commande_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more entries as needed
        ]);
    }
}