<?php

namespace Database\Factories;

use App\Models\Commande;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommandeFactory extends Factory
{
    protected $model = Commande::class;

    public function definition()
    {
        return [
            'date_achat' => $this->faker->date(),
            'statut' => $this->faker->word,
            'commentaire' => $this->faker->sentence,
            'user_id' => User::factory(), // Create a user for the commande
        ];
    }
}