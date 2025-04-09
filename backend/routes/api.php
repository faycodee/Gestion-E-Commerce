<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\LivraisonController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\FaqController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('produits', ProduitController::class);
Route::apiResource('clients', ClientController::class);
Route::apiResource('commandes', CommandeController::class);
Route::apiResource('factures', FactureController::class);
Route::apiResource('faqs', FaqController::class);
Route::apiResource('livraisons', LivraisonController::class);