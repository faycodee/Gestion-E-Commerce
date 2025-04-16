<?php

namespace Database\Factories;

use App\Models\Faq; // Ensure the correct namespace is imported
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Faq>
 */
class FaqFactory extends Factory
{
    protected $model = Faq::class; // Link the factory to the Faq model

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'Question' => $this->faker->sentence(6, true),
            'Reponde' => $this->faker->sentence(10, true),
            'categorie' => $this->faker->word(),
            'Nombre_vues' => $this->faker->numberBetween(0, 100),
        ];
    }
}
