<?php

namespace Database\Factories;

use App\Models\TVA;
use Illuminate\Database\Eloquent\Factories\Factory;

class TVAFactory extends Factory
{
    protected $model = TVA::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->word,
            'periode_TVA' => $this->faker->word,
            'taux' => $this->faker->randomFloat(2, 0, 100),
        ];
    }
}