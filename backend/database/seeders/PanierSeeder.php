<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Panier;

class PanierSeeder extends Seeder
{
    public function run()
    {
        // Fetch all users
        $users = User::all();

        foreach ($users as $user) {
            Panier::create([
                'user_id' => $user->id,
                'montant' => rand(100, 1000), // Random montant
            ]);
        }
    }
}