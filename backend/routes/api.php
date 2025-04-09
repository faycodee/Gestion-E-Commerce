<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\LivraisonController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\ProduitImageController;
use App\Http\Controllers\PaysController;
use App\Http\Controllers\VilleController;
use App\Http\Controllers\CodePostalController;
use App\Http\Controllers\PrivilegeController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\TvaController;
use App\Http\Controllers\ReductionController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CategorieImageController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\LignePanierController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\CommandePaiementController;
use App\Http\Controllers\LigneFactureController;
use App\Http\Controllers\LigneLivraisonController;
use App\Http\Controllers\AvisController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('produits', ProduitController::class);
Route::apiResource('clients', ClientController::class);
Route::apiResource('commandes', CommandeController::class);
Route::apiResource('factures', FactureController::class);
Route::apiResource('faqs', FaqController::class);
Route::apiResource('livraisons', LivraisonController::class);
Route::apiResource('produit-images', ProduitImageController::class);
Route::apiResource('pays', PaysController::class);
Route::apiResource('villes', VilleController::class);
Route::apiResource('code-postaux', CodePostalController::class);
Route::apiResource('privileges', PrivilegeController::class);
Route::apiResource('fournisseurs', FournisseurController::class);
Route::apiResource('tvas', TvaController::class);
Route::apiResource('reductions', ReductionController::class);
Route::apiResource('categories', CategorieController::class);
Route::apiResource('categorie-images', CategorieImageController::class);
Route::apiResource('paniers', PanierController::class);
Route::apiResource('ligne-paniers', LignePanierController::class);
Route::apiResource('paiements', PaiementController::class);
Route::apiResource('commande-paiements', CommandePaiementController::class);
Route::apiResource('ligne-factures', LigneFactureController::class);
Route::apiResource('ligne-livraisons', LigneLivraisonController::class);
Route::apiResource('avis', AvisController::class);