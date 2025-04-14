<?php

namespace Database\Factories;

use App\Models\Panier;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PanierFactory extends Factory
{
    protected $model = Panier::class;

    public function definition()
    {
        return [
            'montant' => $this->faker->randomFloat(2, 10, 1000),
            'user_id' => User::factory(), // Creates a new User instance
        ];
    }
}