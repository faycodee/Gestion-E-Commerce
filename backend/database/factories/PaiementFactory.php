<?php

namespace Database\Factories;

use App\Models\Paiement;
use App\Models\Facture;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaiementFactory extends Factory
{
    protected $model = Paiement::class;

    public function definition()
    {
        return [
            'methode' => $this->faker->word,
            'date_paiment' => $this->faker->date(),
            'updateDate' => $this->faker->date(),
            'facture_id' => Facture::factory(), // Assuming a facture is created for each paiement
        ];
    }
}