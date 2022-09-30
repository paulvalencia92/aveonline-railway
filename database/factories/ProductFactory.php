<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use App\Models\Product;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'reference' => fake()->unique()->randomDigit(),
            'name' => fake()->name,
            'observations' => fake()->text,
            'price' => fake()->randomFloat(),
            'tax' => fake()->randomNumber(1),
            'amount' => fake()->randomNumber(3),
            'status' => Arr::random(Product::availableValues()),
            'file' => "product_default.jpg",
        ];
    }
}
