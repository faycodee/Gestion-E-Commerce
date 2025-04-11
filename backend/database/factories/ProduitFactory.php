<?php

namespace Database\Factories;

use App\Models\Categorie;
use App\Models\Tva;
use App\Models\Reduction;
use App\Models\Fournisseur;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProduitFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => $this->faker->word(),
            'id_categorie' => Categorie::factory(),
            'description' => $this->faker->paragraph(),
            'prix' => $this->faker->numberBetween(10, 1000),
            'stock_min' => $this->faker->numberBetween(5, 20),
            'date' => $this->faker->date(),
            'id_tva' => Tva::factory(),
            'id_reduction' => Reduction::factory(),
            'id_fournisseur' => Fournisseur::factory(),
        ];
    }
}