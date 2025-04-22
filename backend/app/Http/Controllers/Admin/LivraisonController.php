<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class LivraisonController extends Controller
{
    // Fetch all livraisons
    public function index()
    {
        $livraisons = DB::table('livraisons')->get();
        return response()->json($livraisons);
    }

    // Store a new livraison
    public function store(Request $request)
    {
        $validated = $request->validate([
            'frais_expedition' => 'required|numeric',
            'nom_transporteur' => 'required|string|max:50',
            'date_envoi' => 'required|date',
            'URL_suivi' => 'required|string|max:50',
            'poid' => 'required|numeric',
            'estime_arrive' => 'required|string|max:50',
            'status' => 'required|in:pending,shipped,delivered,canceled',
            'commande_id' => 'required|exists:commandes,id',
        ]);

        $id = DB::table('livraisons')->insertGetId($validated);

        return response()->json(['message' => 'Livraison created successfully', 'id' => $id], 201);
    }

    // Show a specific livraison
    public function show($id)
    {
        $livraison = DB::table('livraisons')->find($id);

        if (!$livraison) {
            return response()->json(['message' => 'Livraison not found'], 404);
        }

        return response()->json($livraison);
    }

    // Update a specific livraison
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'frais_expedition' => 'sometimes|numeric',
            'nom_transporteur' => 'sometimes|string|max:50',
            'date_envoi' => 'sometimes|date',
            'URL_suivi' => 'sometimes|string|max:50',
            'poid' => 'sometimes|numeric',
            'estime_arrive' => 'sometimes|string|max:50',
            'status' => 'sometimes|in:pending,shipped,delivered,canceled',
            'commande_id' => 'sometimes|exists:commandes,id',
        ]);

        $updated = DB::table('livraisons')->where('id', $id)->update($validated);

        if (!$updated) {
            return response()->json(['message' => 'Livraison not found or no changes made'], 404);
        }

        return response()->json(['message' => 'Livraison updated successfully']);
    }

    // Delete a specific livraison
    public function destroy($id)
    {
        $deleted = DB::table('livraisons')->where('id', $id)->delete();

        if (!$deleted) {
            return response()->json(['message' => 'Livraison not found'], 404);
        }

        return response()->json(['message' => 'Livraison deleted successfully']);
    }
}