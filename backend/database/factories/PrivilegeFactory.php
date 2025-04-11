<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PrivilegeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => $this->faker->unique()->randomElement(['Standard', 'Premium', 'VIP']),
        ];
    }
}