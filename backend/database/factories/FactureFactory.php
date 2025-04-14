<?php

namespace Database\Factories;

use App\Models\Facture;
use App\Models\Commande;
use Illuminate\Database\Eloquent\Factories\Factory;

class FactureFactory extends Factory
{
    protected $model = Facture::class;

    public function definition()
    {
        return [
            'date_facturation' => $this->faker->date(),
            'montant_HT' => $this->faker->randomFloat(2, 10, 1000),
            'montant_TTC' => $this->faker->randomFloat(2, 10, 1000),
            'montant_TVA' => $this->faker->randomFloat(2, 1, 100),
            'payment_status' => $this->faker->randomElement(['pending', 'completed', 'failed']),
            'commande_id' => Commande::factory(), // Create a related Commande instance
        ];
    }
}