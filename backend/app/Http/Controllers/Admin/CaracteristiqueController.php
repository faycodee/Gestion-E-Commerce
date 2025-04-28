<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CaracteristiqueController extends Controller
{
    // Get all Caractéristiques
    public function index()
    {
        $caracteristiques = DB::table('caracteristiques')
            ->join('produits', 'caracteristiques.produit_id', '=', 'produits.id')
            ->select('caracteristiques.*', 'produits.nom as produit_nom')
            ->get();

        return response()->json($caracteristiques);
    }

    // Store a new Caractéristique
    public function store(Request $request)
    {
        $validated = $request->validate([
            'couleur' => 'required|string|max:50',
            'taille' => 'required|string|max:50',
            'produit_id' => 'required|exists:produits,id',
        ]);

        $id = DB::table('caracteristiques')->insertGetId([
            'couleur' => $validated['couleur'],
            'taille' => $validated['taille'],
            'produit_id' => $validated['produit_id'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['id' => $id, 'message' => 'Caractéristique added successfully'], 201);
    }

    // Show a specific Caractéristique
    public function show($id)
    {
        $caracteristique = DB::table('caracteristiques')
            ->where('id', $id)
            ->first();

        if (!$caracteristique) {
            return response()->json(['message' => 'Caractéristique not found'], 404);
        }

        return response()->json($caracteristique);
    }

    // Update an existing Caractéristique
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'couleur' => 'sometimes|string|max:50',
            'taille' => 'sometimes|string|max:50',
            'produit_id' => 'sometimes|exists:produits,id',
        ]);

        $updated = DB::table('caracteristiques')
            ->where('id', $id)
            ->update(array_merge($validated, ['updated_at' => now()]));

        if (!$updated) {
            return response()->json(['message' => 'Caractéristique not found or not updated'], 404);
        }

        return response()->json(['message' => 'Caractéristique updated successfully']);
    }

    // Delete a Caractéristique
    public function destroy($id)
    {
        $deleted = DB::table('caracteristiques')->where('id', $id)->delete();

        if (!$deleted) {
            return response()->json(['message' => 'Caractéristique not found'], 404);
        }

        return response()->json(['message' => 'Caractéristique deleted successfully']);
    }
}