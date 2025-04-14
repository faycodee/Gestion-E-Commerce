<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        // Sample categories to seed
        $categories = [
            [
                'nom' => 'Electronics',
                'description' => 'Devices and gadgets',
                'image' => 'path/to/electronics.jpg',
            ],
            [
                'nom' => 'Books',
                'description' => 'Various genres of books',
                'image' => 'path/to/books.jpg',
            ],
            [
                'nom' => 'Clothing',
                'description' => 'Apparel and accessories',
                'image' => 'path/to/clothing.jpg',
            ],
            // Add more categories as needed
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}