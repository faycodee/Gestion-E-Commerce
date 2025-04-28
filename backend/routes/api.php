<?php
use App\Http\Controllers\Admin\CouponController;
use App\Models\Category;
use App\Models\TVA;

use App\Services\GoogleSheetsServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\ProduitController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommandeController;
use App\Http\Controllers\Admin\TvaController;
use App\Http\Controllers\Admin\FactureController;
use App\Http\Controllers\Admin\ReductionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ReductionProduitController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Public\PubProduitController;
use App\Http\Controllers\Public\PubCategoryController;
use App\Http\Controllers\User\AvisController;
use App\Http\Controllers\User\FavouriteController;
use App\Http\Controllers\User\PanierController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\LignePanierController;
use App\Http\Controllers\User\LigneCommandeController;
use App\Http\Controllers\Admin\GoogleSheetsController;
use App\Http\Controllers\Admin\LivraisonController;
use App\Http\Controllers\Admin\CaracteristiqueController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('/produits', ProduitController::class);
Route::apiResource('/categories', CategoryController::class);
Route::apiResource('/faqs', FaqController::class);
Route::apiResource('/tvas', TvaController::class);
Route::get('/Pubcategory', [PubCategoryController::class, 'index']);
Route::get('/Pubcategory/{id}', [PubCategoryController::class, 'show']);
Route::get('/Pubproduity', [PubProduitController::class, 'index']);
Route::get('/Pubproduity/{id}', [PubProduitController::class, 'show']);

Route::apiResource('/avis', AvisController::class);
Route::apiResource('/commandes', CommandeController::class);
Route::apiResource('/favourites', FavouriteController::class);
Route::apiResource('/paniers', PanierController::class);
Route::apiResource('/profile', ProfileController::class);
Route::apiResource('/ligne-commandes', LigneCommandeController::class);
Route::prefix('ligne-panier')->group(function () {
    Route::get('/{panierId}', [LignePanierController::class, 'index']); // Get all items in a panier
    Route::post('/', [LignePanierController::class, 'store']); // Add a product to a panier
    Route::put('/{id}', [LignePanierController::class, 'update']); // Remove a product from a panier
    Route::delete('/{id}', [LignePanierController::class, 'destroy']); // Remove a product from a panier
});

Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('/commandes', CommandeController::class);
    Route::apiResource('/users', UserController::class);
    
});
Route::apiResource('/factures', FactureController::class);
Route::apiResource('/reductions', ReductionController::class);
Route::apiResource('/reductionproduits', ReductionProduitController::class);
Route::get('/categories', fn () => Category::all());
Route::get('/tvas', fn () => TVA::all());

Route::post('/googlesheets/append', [GoogleSheetsController::class, 'appendToSheet']);

Route::get('/livraisons', [LivraisonController::class, 'index']);
Route::post('/livraisons', [LivraisonController::class, 'store']);
Route::get('/livraisons/{id}', [LivraisonController::class, 'show']);
Route::put('/livraisons/{id}', [LivraisonController::class, 'update']);
Route::delete('/livraisons/{id}', [LivraisonController::class, 'destroy']);

Route::prefix('coupons')->group(function () {
    Route::post('/generate', [CouponController::class, 'generate']);
    Route::post('/validate', [CouponController::class, 'validate']);
    Route::post('/redeem', [CouponController::class, 'redeem']);
});

Route::apiResource('/caracteristiques', CaracteristiqueController::class);