<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PubProduitController extends Controller
{
    // عرض جميع المنتجات
    public function index()
    {
        $produits = DB::table('produits')->get();
        return response()->json($produits);
    }

    // عرض منتج معين باستخدام ID
    public function show($id)
    {
        $produit = DB::table('produits')->where('id', $id)->first();

        if (!$produit) {
            return response()->json(['message' => 'Produit not found'], 404);
        }

        return response()->json($produit);
    }
}
