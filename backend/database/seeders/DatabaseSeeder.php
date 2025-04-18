<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            TVASeeder::class, // Ensure this runs first
            CategorySeeder::class,
            ProduitSeeder::class, // ProduitSeeder depends on TVASeeder
            UserSeeder::class, // UserSeeder must run before CommandeSeeder
            CommandeSeeder::class, // CommandeSeeder depends on UserSeeder
            FactureSeeder::class,
            ReductionSeeder::class, // Ensure this runs before ReductionProduitSeeder
            ReductionProduitSeeder::class,
            PanierSeeder::class,
            LignePanierSeeder::class,
            LigneCommandeSeeder::class,
            LivraisonSeeder::class,
            FavouriteSeeder::class,
            CaracteristiqueSeeder::class,
            AvisSeeder::class,
            PaiementSeeder::class,
            FaqSeeder::class,
        ]);
    }
}
