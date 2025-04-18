<?php

namespace Database\Factories;

use App\Models\Commande;
use App\Models\Produit;
use App\Models\LigneCommande;
use Illuminate\Database\Eloquent\Factories\Factory;

class LigneCommandeFactory extends Factory
{
    protected $model = LigneCommande::class;

    public function definition()
    {
        return [
            'commande_id' => Commande::factory(), // Create or associate with a Commande
            'produit_id' => Produit::factory(),  // Create or associate with a Produit
            'quantite' => $this->faker->numberBetween(1, 10), // Random quantity between 1 and 10
            'prix_unitaire' => $this->faker->randomFloat(2, 10, 500), // Random price between 10 and 500
        ];
    }
}
