<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProduitImageController extends Controller
{
    public function index()
    {
        // Retrieve all produit images
        $produitImages = DB::table('produit_image')->get();
        return response()->json($produitImages, 200);
    }

    public function store(Request $request)
    {
        // Create a new produit image
        $id = DB::table('produit_image')->insertGetId($request->all());
        $produitImage = DB::table('produit_image')->where('id', $id)->first();
        return response()->json($produitImage, 201);
    }

    public function show($id)
    {
        // Retrieve a single produit image
        $produitImage = DB::table('produit_image')->where('id', $id)->first();
        if ($produitImage) {
            return response()->json($produitImage, 200);
        }
        return response()->json(['error' => 'Produit image not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing produit image
        $updated = DB::table('produit_image')->where('id', $id)->update($request->all());
        if ($updated) {
            $produitImage = DB::table('produit_image')->where('id', $id)->first();
            return response()->json($produitImage, 200);
        }
        return response()->json(['error' => 'Produit image not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a produit image
        $deleted = DB::table('produit_image')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Produit image deleted'], 200);
        }
        return response()->json(['error' => 'Produit image not found'], 404);
    }
}
