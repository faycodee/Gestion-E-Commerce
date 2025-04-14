<?php

namespace Database\Factories;

use App\Models\LignePanier;
use App\Models\Produit;
use App\Models\Panier;
use Illuminate\Database\Eloquent\Factories\Factory;

class LignePanierFactory extends Factory
{
    protected $model = LignePanier::class;

    public function definition()
    {
        return [
            'produit_id' => Produit::factory(),
            'panier_id' => Panier::factory(),
        ];
    }
}