<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
            'prix_HT' => 'required|numeric', // Match the frontend key
            'quantity' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'tva_id' => 'required|exists:tvas,id',
            'image' => 'nullable|image',
        ]);

        $imagePath = '';
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('produits', 'public');
        }

        $id = DB::table('produits')->insertGetId([
            'nom' => $request->nom,
            'description' => $request->description,
            'prix_HT' => $request->prix_HT,
            'quantity' => $request->quantity,
            'category_id' => $request->category_id,
            'tva_id' => $request->tva_id,
            'image' => $imagePath,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        return response()->json([
            'message' => "Produit ID $id ajouté avec succès"
        ]);
    }

    /**
     * Update an existing product.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'prix_HT' => 'required|numeric', // Match the frontend key
            'quantity' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'tva_id' => 'required|exists:tvas,id',
            'image' => 'nullable|image',
        ]);

        $produit = DB::table('produits')->where('id', $id)->first();

        if (!$produit) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $imagePath = $produit->image; // Keep existing image by default
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($produit->image && Storage::disk('public')->exists($produit->image)) {
                Storage::disk('public')->delete($produit->image);
            }
            // Store new image
            $imagePath = $request->file('image')->store('produits', 'public');
        }

        DB::table('produits')->where('id', $id)->update([
            'nom' => $request->nom,
            'description' => $request->description,
            'prix_HT' => $request->prix_HT,
            'quantity' => $request->quantity,
            'category_id' => $request->category_id,
            'tva_id' => $request->tva_id,
            'image' => $imagePath,
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Produit modifié avec succès']);
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
