<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LignePanierController extends Controller
{
    /**
     * Get all items in the ligne_panier table for a specific panier.
     */
    public function index($panierId)
    {
        $lignePaniers = DB::table('ligne_panier')
            ->where('panier_id', $panierId)
            ->join('produits', 'ligne_panier.produit_id', '=', 'produits.id')
            ->select('ligne_panier.*', 'produits.nom as produit_nom', 'produits.prix_HT as produit_prix')
            ->get();

        if ($lignePaniers->isEmpty()) {
            return response()->json(['message' => 'No items found in this panier'], 404);
        }

        return response()->json($lignePaniers, 200);
    }

    /**
     * Add a product to the ligne_panier table.
     */
    public function store(Request $request)
    {
        $request->validate([
            'panier_id' => 'required|integer|exists:paniers,id',
            'produit_id' => 'required|integer|exists:produits,id',
            'quantity' => 'required|integer|min:1',
        ]);

        DB::table('ligne_panier')->insert([
            'panier_id' => $request->panier_id,
            'produit_id' => $request->produit_id,
            'quantity' => $request->quantity,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Product added to panier successfully'], 201);
    }

    /**
     * Remove a product from the ligne_panier table.
     */
    public function destroy($id)
    {
        $deleted = DB::table('ligne_panier')->where('id', $id)->delete();

        if (!$deleted) {
            return response()->json(['message' => 'LignePanier not found'], 404);
        }

        return response()->json(['message' => 'Product removed from panier successfully'], 200);
    }
}
