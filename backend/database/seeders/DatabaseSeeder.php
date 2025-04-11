<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PaysSeeder::class,
            VilleSeeder::class,
            CodePostalSeeder::class,
            PrivilegeSeeder::class,
            ClientSeeder::class,
            ClientAdresseSeeder::class,
            FournisseurSeeder::class,
            TvaSeeder::class,
            ReductionSeeder::class,
            CategorieSeeder::class,
            ProduitSeeder::class,
            ProduitImageSeeder::class,
            StockSeeder::class,
            PanierSeeder::class,
            LignePanierSeeder::class,
            CommandeSeeder::class,
            LigneCommandeSeeder::class,
            PaiementSeeder::class,
            CommandePaiementSeeder::class,
            FactureSeeder::class,
            LigneFactureSeeder::class,
            LivraisonSeeder::class,
            LigneLivraisonSeeder::class,
            AvisSeeder::class,
            FaqSeeder::class,
        ]);
    }
}
