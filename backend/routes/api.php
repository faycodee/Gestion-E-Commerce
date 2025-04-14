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
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('/produits', ProduitController::class);
Route::apiResource('/categories', CategoryController::class);



// Route::prefix('admin')->group(function () {
    Route::apiResource('commandes', CommandeController::class);
    Route::apiResource('factures', FactureController::class);
    Route::apiResource('produits', ProduitController::class);
    Route::apiResource('reductions', ReductionController::class);
    Route::apiResource('users', UserController::class);
// });