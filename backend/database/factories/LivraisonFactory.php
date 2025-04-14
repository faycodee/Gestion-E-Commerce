<?php

namespace Database\Factories;

use App\Models\Livraison;
use App\Models\Commande;
use Illuminate\Database\Eloquent\Factories\Factory;

class LivraisonFactory extends Factory
{
    protected $model = Livraison::class;

    public function definition()
    {
        return [
            'frais_expedition' => $this->faker->randomFloat(2, 5, 100),
            'nom_transporteur' => $this->faker->company,
            'date_envoi' => $this->faker->date(),
            'URL_suivi' => $this->faker->url,
            'poid' => $this->faker->randomFloat(2, 1, 50),
            'estime_arrive' => $this->faker->date(),
            'commande_id' => Commande::factory(), // Create a new Commande instance
        ];
    }
}