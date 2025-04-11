<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StockFactory extends Factory
{
    public function definition(): array
    {
        return [
            'quantite' => $this->faker->numberBetween(0, 100),
            'createDate' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updateDate' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }
}