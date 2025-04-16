<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Panier;
use App\Models\Produit;
use App\Models\LignePanier;

class LignePanierSeeder extends Seeder
{
    public function run()
    {
        // Fetch all paniers
        $paniers = Panier::all();

        // Ensure each panier has at least 4 ligne_panier entries
        foreach ($paniers as $panier) {
            // Fetch random products to associate with the panier
            $produits = Produit::inRandomOrder()->take(4)->get();

            foreach ($produits as $produit) {
                LignePanier::create([
                    'produit_id' => $produit->id,
                    'panier_id' => $panier->id,
                ]);
            }
        }
    }
}