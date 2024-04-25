<?php

namespace Database\Seeders;

use App\Models\category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        category::create([
            'name' => "Fruits", 
        ]);

        category::create([
            'name' => "Beverages", 
        ]);
        category::create([
            'name' => "Snacks", 
        ]);

    }
}
