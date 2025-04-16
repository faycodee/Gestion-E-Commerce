<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProduitSeeder extends Seeder
{
    public function run()
    {
        DB::table('produits')->insert([
            [
                'nom' => 'Apple iPhone 14',
                'description' => 'The latest iPhone with A15 Bionic chip and advanced camera system.',
                'prix_HT' => 999.00,
                'quantity' => 15,
                'image' => 'iphone14.jpg',
                'category_id' => 1, // Smartphones
                'tva_id' => 1,
            ],
            [
                'nom' => 'Samsung Galaxy S23',
                'description' => 'Flagship smartphone with Snapdragon 8 Gen 2 and 120Hz AMOLED display.',
                'prix_HT' => 899.00,
                'quantity' => 20,
                'image' => 'galaxy_s23.jpg',
                'category_id' => 1, // Smartphones
                'tva_id' => 1,
            ],
            [
                'nom' => 'Sony WH-1000XM5',
                'description' => 'Industry-leading noise-canceling headphones with exceptional sound quality.',
                'prix_HT' => 349.00,
                'quantity' => 30,
                'image' => 'sony_wh1000xm5.jpg',
                'category_id' => 2, // Headphones
                'tva_id' => 2,
            ],
            [
                'nom' => 'Dell XPS 13',
                'description' => 'Ultra-thin and powerful laptop with Intel Core i7 and 16GB RAM.',
                'prix_HT' => 1299.00,
                'quantity' => 10,
                'image' => 'dell_xps13.jpg',
                'category_id' => 3, // Laptops
                'tva_id' => 1,
            ],
            [
                'nom' => 'Apple MacBook Pro 16"',
                'description' => 'High-performance laptop with M2 Pro chip and Retina display.',
                'prix_HT' => 2499.00,
                'quantity' => 8,
                'image' => 'macbook_pro16.jpg',
                'category_id' => 3, // Laptops
                'tva_id' => 1,
            ],
            [
                'nom' => 'Logitech MX Master 3',
                'description' => 'Advanced wireless mouse with ergonomic design and customizable buttons.',
                'prix_HT' => 99.00,
                'quantity' => 50,
                'image' => 'logitech_mx_master3.jpg',
                'category_id' => 1, // Accessories
                'tva_id' => 2,
            ],
            [
                'nom' => 'Canon EOS R6',
                'description' => 'Full-frame mirrorless camera with 20MP sensor and 4K video recording.',
                'prix_HT' => 2499.00,
                'quantity' => 5,
                'image' => 'canon_eos_r6.jpg',
                'category_id' => 2, // Cameras
                'tva_id' => 1,
            ],
            [
                'nom' => 'Samsung 55" QLED TV',
                'description' => '4K UHD Smart TV with Quantum Dot technology and HDR support.',
                'prix_HT' => 799.00,
                'quantity' => 12,
                'image' => 'samsung_qled_tv.jpg',
                'category_id' => 1, // Televisions
                'tva_id' => 1,
            ],
            [
                'nom' => 'Bose SoundLink Revolve+',
                'description' => 'Portable Bluetooth speaker with 360-degree sound and deep bass.',
                'prix_HT' => 299.00,
                'quantity' => 25,
                'image' => 'bose_soundlink_revolve.jpg',
                'category_id' => 3, // Speakers
                'tva_id' => 2,
            ],
            [
                'nom' => 'Fitbit Charge 5',
                'description' => 'Advanced fitness tracker with heart rate monitoring and GPS.',
                'prix_HT' => 149.00,
                'quantity' => 40,
                'image' => 'fitbit_charge5.jpg',
                'category_id' => 2, // Wearables
                'tva_id' => 2,
            ],
        ]);
    }
}