<?php

namespace Database\Factories;

use App\Models\Caracteristique;
use App\Models\Produit;
use Illuminate\Database\Eloquent\Factories\Factory;

class CaracteristiqueFactory extends Factory
{
    protected $model = Caracteristique::class;

    public function definition()
    {
        return [
            'couleur' => $this->faker->colorName,
            'taille' => $this->faker->word,
            'produit_id' => Produit::factory(), // Create a new Produit instance
        ];
    }
}