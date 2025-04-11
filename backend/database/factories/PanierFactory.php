<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class PanierFactory extends Factory
{
    public function definition(): array
    {
        return [
            'montant' => $this->faker->numberBetween(100, 10000),
            'createddate' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updateddate' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'id_client' => Client::factory(),
        ];
    }
}