<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\LigneCommande;
use App\Models\Commande;
use App\Models\Produit;


class LigneCommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all LigneCommande records with related Commande and Produit
        $ligneCommandes = LigneCommande::get();
        // $ligneCommandes = LigneCommande::with(['commande', 'produit'])->get();

        return response()->json($ligneCommandes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'commande_id' => 'required|exists:commandes,id',
            'produit_id' => 'required|exists:produits,id',
            'quantite' => 'required|integer|min:1',
            'prix_unitaire' => 'required|numeric|min:0',
        ]);

        // Create a new LigneCommande
        $ligneCommande = LigneCommande::create($validated);

        return response()->json([
            'message' => 'LigneCommande created successfully!',
            'data' => $ligneCommande,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Fetch a single LigneCommande with related Commande and Produit
        $ligneCommande = LigneCommande::with(['commande', 'produit'])->findOrFail($id);

        return response()->json($ligneCommande);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the request
        $validated = $request->validate([
            'commande_id' => 'sometimes|exists:commandes,id',
            'produit_id' => 'sometimes|exists:produits,id',
            'quantite' => 'sometimes|integer|min:1',
            'prix_unitaire' => 'sometimes|numeric|min:0',
        ]);

        // Find the LigneCommande and update it
        $ligneCommande = LigneCommande::findOrFail($id);
        $ligneCommande->update($validated);

        return response()->json([
            'message' => 'LigneCommande updated successfully!',
            'data' => $ligneCommande,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the LigneCommande and delete it
        $ligneCommande = LigneCommande::findOrFail($id);
        $ligneCommande->delete();

        return response()->json([
            'message' => 'LigneCommande deleted successfully!',
        ]);
    }
}
