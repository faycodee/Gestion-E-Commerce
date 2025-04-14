<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProduitController extends Controller
{
    /**y
     * Get all products.
     */
    public function index()
    {
        $produits = DB::table('produits')->get();
        return response()->json($produits, 200);
    }

    /**
     * Get a single product by ID.
     */
    public function show($id)
    {
        $produit = DB::table('produits')->where('id', $id)->first();

        if (!$produit) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($produit, 200);
    }

    /**
     * Create a new product.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'prix_HT' => 'required|numeric',
            'quantity' => 'required|integer',
            'image' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'tva_id' => 'required|integer|exists:tvas,id',
        ]);

        $id = DB::table('produits')->insertGetId([
            'nom' => $request->nom,
            'description' => $request->description,
            'prix_HT' => $request->prix_HT,
            'quantity' => $request->quantity,
            'image' => $request->image,
            'category_id' => $request->category_id,
            'tva_id' => $request->tva_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Product created successfully', 'id' => $id], 201);
    }

    /**
     * Update an existing product.
     */
    public function update(Request $request, $id)
    {
        $produit = DB::table('produits')->where('id', $id)->first();

        if (!$produit) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $request->validate([
            'nom' => 'string|max:255',
            'description' => 'string',
            'prix_HT' => 'numeric',
            'quantity' => 'integer',
            'image' => 'string',
            'category_id' => 'integer|exists:categories,id',
            'tva_id' => 'integer|exists:tvas,id',
        ]);

        DB::table('produits')->where('id', $id)->update([
            'nom' => $request->nom ?? $produit->nom,
            'description' => $request->description ?? $produit->description,
            'prix_HT' => $request->prix_HT ?? $produit->prix_HT,
            'quantity' => $request->quantity ?? $produit->quantity,
            'image' => $request->image ?? $produit->image,
            'category_id' => $request->category_id ?? $produit->category_id,
            'tva_id' => $request->tva_id ?? $produit->tva_id,
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Product updated successfully'], 200);
    }

    /**
     * Delete a product.
     */
    public function destroy($id)
    {
        $produit = DB::table('produits')->where('id', $id)->first();

        if (!$produit) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        DB::table('produits')->where('id', $id)->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
