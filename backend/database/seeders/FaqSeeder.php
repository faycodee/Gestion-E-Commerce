<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faq; // Ensure the correct namespace is imported

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Generate 50 fake FAQs
        Faq::factory()->count(50)->create();
    }
}
