<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Facture;
use App\Models\Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FactureController extends Controller
{
    public function index()
    {
        $factures = Facture::with('commande')->get();
        return response()->json($factures);
    }

    public function store(Request $request)
    {
        $request->validate([
            'commande_id' => 'required|integer|exists:commandes,id',
            'montant_HT' => 'required|numeric|min:0',
            'payment_status' => 'required|string|in:pending,paid,cancelled',
        ]);

        // Calculate TVA (20% for example)
        $montantHT = $request->montant_HT;
        $montantTVA = $montantHT * 0.20;
        $montantTTC = $montantHT + $montantTVA;

        $facture = Facture::create([
            'commande_id' => $request->commande_id,
            'date_facturation' => now(),
            'montant_HT' => $montantHT,
            'montant_TVA' => $montantTVA,
            'montant_TTC' => $montantTTC,
            'payment_status' => $request->payment_status,
        ]);

        return response()->json($facture, 201);
    }

    public function show($id)
    {
        $facture = Facture::with('commande')->find($id);
        
        if (!$facture) {
            return response()->json(['error' => 'Facture not found'], 404);
        }

        return response()->json($facture);
    }

    public function update(Request $request, $id)
    {
        $facture = Facture::find($id);

        if (!$facture) {
            return response()->json(['error' => 'Facture not found'], 404);
        }

        $request->validate([
            'montant_HT' => 'required|numeric|min:0',
            'payment_status' => 'required|string|in:pending,paid,cancelled',
        ]);

        // Recalculate amounts
        $montantHT = $request->montant_HT;
        $montantTVA = $montantHT * 0.20;
        $montantTTC = $montantHT + $montantTVA;

        $facture->update([
            'montant_HT' => $montantHT,
            'montant_TVA' => $montantTVA,
            'montant_TTC' => $montantTTC,
            'payment_status' => $request->payment_status,
        ]);

        return response()->json([
            'message' => 'Facture updated successfully',
            'facture' => $facture
        ]);
    }

    public function destroy($id)
    {
        $facture = Facture::find($id);

        if (!$facture) {
            return response()->json(['error' => 'Facture not found'], 404);
        }

        $facture->delete();

        return response()->json(['message' => 'Facture deleted successfully']);
    }

    // Additional helper method to generate invoice for an order
    public function generateForOrder($commandeId)
    {
        $commande = Commande::with('ligneCommandes.produit')->find($commandeId);
        
        if (!$commande) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        // Calculate total HT from order lines
        $montantHT = $commande->ligneCommandes->sum(function ($ligne) {
            return $ligne->quantite * $ligne->prix_unitaire;
        });

        $montantTVA = $montantHT * 0.20;
        $montantTTC = $montantHT + $montantTVA;

        $facture = Facture::create([
            'commande_id' => $commandeId,
            'date_facturation' => now(),
            'montant_HT' => $montantHT,
            'montant_TVA' => $montantTVA,
            'montant_TTC' => $montantTTC,
            'payment_status' => 'pending',
        ]);

        return response()->json($facture, 201);
    }
}