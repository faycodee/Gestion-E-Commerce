<?php

namespace Database\Factories;

use App\Models\ReductionProduit;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReductionProduitFactory extends Factory
{
    protected $model = ReductionProduit::class;

    public function definition()
    {
        return [
            'produit_id' => \App\Models\Produit::factory(), // Assuming a Produit factory exists
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}