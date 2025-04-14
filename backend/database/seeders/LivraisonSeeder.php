<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LivraisonSeeder extends Seeder
{
    public function run()
    {
        DB::table('livraisons')->insert([
            [
                'frais_expedition' => 10.00,
                'nom_transporteur' => 'Transporteur A',
                'date_envoi' => now(),
                'URL_suivi' => 'http://example.com/suivi/1',
                'poid' => 2.5,
                'estime_arrive' => '2023-10-10',
                'commande_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'frais_expedition' => 15.00,
                'nom_transporteur' => 'Transporteur B',
                'date_envoi' => now(),
                'URL_suivi' => 'http://example.com/suivi/2',
                'poid' => 3.0,
                'estime_arrive' => '2023-10-12',
                'commande_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more entries as needed
        ]);
    }
}