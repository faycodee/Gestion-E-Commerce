<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\ProduitController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommandeController;
use App\Http\Controllers\Admin\FactureController;
use App\Http\Controllers\Admin\ReductionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Public\PubProduitController;
use App\Http\Controllers\Public\PubCategoryController;
use App\Http\Controllers\User\AvisController;
use App\Http\Controllers\User\UserCommandeController;
use App\Http\Controllers\User\FavouriteController;
use App\Http\Controllers\User\PanierController;
use App\Http\Controllers\User\ProfileController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('/produits', ProduitController::class);
Route::apiResource('/categories', CategoryController::class);
Route::apiResource('/faqs', FaqController::class);
Route::get('/Pubcategory', [PubCategoryController::class, 'index']);
Route::get('/Pubcategory/{id}', [PubCategoryController::class, 'show']);
Route::get('/Pubproduity', [PubProduitController::class, 'index']);
Route::get('/Pubproduity/{id}', [PubProduitController::class, 'show']);

Route::apiResource('/avis', AvisController::class);
Route::apiResource('/commandes', UserCommandeController::class);
Route::apiResource('/favourites', FavouriteController::class);
Route::apiResource('/paniers', PanierController::class);
Route::apiResource('/profile', ProfileController::class);


// Route::prefix('admin')->group(function () {
    Route::apiResource('/commandes', CommandeController::class);
    Route::apiResource('/factures', FactureController::class);
    Route::apiResource('/reductions', ReductionController::class);
    Route::apiResource('/users', UserController::class);
// });