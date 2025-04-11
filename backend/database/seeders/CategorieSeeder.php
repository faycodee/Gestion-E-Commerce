<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['nom' => 'Electronics', 'description' => 'Electronic devices and accessories'],
            ['nom' => 'Clothing', 'description' => 'Fashion and apparel'],
            ['nom' => 'Books', 'description' => 'Books and publications'],
            ['nom' => 'Home & Garden', 'description' => 'Home improvement and garden supplies'],
        ];

        foreach ($categories as $category) {
            Categorie::create($category);
        }
    }
}