<?php

namespace Database\Factories;

use App\Models\Reduction;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReductionFactory extends Factory
{
    protected $model = Reduction::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->word,
            'pourcentage_reduction' => $this->faker->numberBetween(1, 100) . '%',
            'actif' => $this->faker->boolean,
            'periode_reduction' => $this->faker->date(),
        ];
    }
}