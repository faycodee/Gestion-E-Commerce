<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName,
            'name' => $this->faker->lastName,
            'role' => $this->faker->randomElement(['admin', 'user']),
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => bcrypt('password'), // password
            'remember_token' => Str::random(10),
            'tele' => $this->faker->phoneNumber, // Génération aléatoire de téléphone
            'adresse' => $this->faker->address, // Génération aléatoire d'adresse
        ];
    }
}