<?php

namespace Database\Factories;

use App\Models\Favourite;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FavouriteFactory extends Factory
{
    protected $model = Favourite::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // Assuming a user is required for a favourite
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}