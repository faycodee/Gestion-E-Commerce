<?php

namespace Database\Factories;

use App\Models\Avis;
use App\Models\User;
use App\Models\Produit;
use Illuminate\Database\Eloquent\Factories\Factory;

class AvisFactory extends Factory
{
    protected $model = Avis::class;

    public function definition()
    {
        return [
            'notation' => $this->faker->numberBetween(1, 5),
            'avis' => $this->faker->sentence(),
            'titre' => $this->faker->sentence(3),
            'user_id' => User::factory(),
            'produit_id' => Produit::factory(),
        ];
    }
}