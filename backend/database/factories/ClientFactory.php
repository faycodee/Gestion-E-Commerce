<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Privilege;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'id_privilege' => Privilege::factory(),
            'nom' => $this->faker->lastName(),
            'prenom' => $this->faker->firstName(),
            'email' => $this->faker->unique()->safeEmail(),
            'adresse' => $this->faker->address(),
            'telephone' => $this->faker->phoneNumber(),
            'login' => $this->faker->userName(),
            'mdp' => bcrypt('password'),
            'dateC' => $this->faker->date(),
        ];
    }
}