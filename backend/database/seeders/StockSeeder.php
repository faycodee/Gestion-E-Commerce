<?php

namespace Database\Seeders;

use App\Models\Stock;
use App\Models\Produit;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    public function run(): void
    {
        Produit::all()->each(function ($produit) {
            Stock::factory()->create([
                'id_produit' => $produit->id,
            ]);
        });
    }
}