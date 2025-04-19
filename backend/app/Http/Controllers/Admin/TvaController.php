<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TvaController extends Controller
{
    /**
     * Get all TVA records.
     */
    public function index()
    {
        try {
            $tvas = DB::table('tvas')->get();
            return response()->json($tvas, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération des TVA', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a new TVA record.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'periode_TVA' => 'required|string|max:255',
            'taux' => 'required|numeric|min:0',
        ]);

        try {
            $id = DB::table('tvas')->insertGetId([
                'nom' => $request->input('nom'),
                'periode_TVA' => $request->input('periode_TVA'),
                'taux' => $request->input('taux'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json(['message' => 'TVA créée avec succès', 'id' => $id], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la création de la TVA', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show a specific TVA record.
     */
    public function show($id)
    {
        try {
            $tva = DB::table('tvas')->where('id', $id)->first();

            if (!$tva) {
                return response()->json(['message' => 'TVA introuvable'], 404);
            }

            return response()->json($tva, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération de la TVA', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update a specific TVA record.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'periode_TVA' => 'sometimes|required|string|max:255',
            'taux' => 'sometimes|required|numeric|min:0',
        ]);

        try {
            $tva = DB::table('tvas')->where('id', $id)->first();

            if (!$tva) {
                return response()->json(['message' => 'TVA introuvable'], 404);
            }

            DB::table('tvas')->where('id', $id)->update([
                'nom' => $request->input('nom', $tva->nom),
                'periode_TVA' => $request->input('periode_TVA', $tva->periode_TVA),
                'taux' => $request->input('taux', $tva->taux),
                'updated_at' => now(),
            ]);

            return response()->json(['message' => 'TVA mise à jour avec succès'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la mise à jour de la TVA', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete a specific TVA record.
     */
    public function destroy($id)
    {
        try {
            $tva = DB::table('tvas')->where('id', $id)->first();

            if (!$tva) {
                return response()->json(['message' => 'TVA introuvable'], 404);
            }

            DB::table('tvas')->where('id', $id)->delete();

            return response()->json(['message' => 'TVA supprimée avec succès'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la suppression de la TVA', 'error' => $e->getMessage()], 500);
        }
    }
}
