<?php

namespace Database\Factories;

use App\Models\Produit;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProduitFactory extends Factory
{
    protected $model = Produit::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->word,
            'description' => $this->faker->sentence,
            'prix_HT' => $this->faker->randomFloat(2, 1, 1000),
            'quantity' => $this->faker->numberBetween(1, 100),
            'image' => $this->faker->imageUrl(),
            'category_id' => \App\Models\Category::factory(),
            'tva_id' => \App\Models\TVA::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}