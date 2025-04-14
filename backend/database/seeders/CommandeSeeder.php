<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommandeSeeder extends Seeder
{
    public function run()
    {
        DB::table('commandes')->insert([
            [
                'user_id' => 1, // Matches a valid user_id from UserSeeder
                'commentaire' => '8Eef0PWJSV',
                'date_achat' => now(),
                'statut' => 'Pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2, // Matches a valid user_id from UserSeeder
                'commentaire' => 'NRpDBX8Usy',
                'date_achat' => now()->subDay(),
                'statut' => 'Completed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3, // Matches a valid user_id from UserSeeder
                'commentaire' => 'lwm2pnqZ1i',
                'date_achat' => now()->subDays(2),
                'statut' => 'Cancelled',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}