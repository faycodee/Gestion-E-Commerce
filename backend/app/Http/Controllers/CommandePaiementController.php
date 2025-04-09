<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommandePaiementController extends Controller
{
    public function index()
    {
        // Retrieve all commande_paiement records
        $commandePaiements = DB::table('commande_paiement')->get();
        return response()->json($commandePaiements, 200);
    }

    public function store(Request $request)
    {
        // Create a new commande_paiement record
        $id = DB::table('commande_paiement')->insertGetId($request->all());
        $commandePaiement = DB::table('commande_paiement')->where('id', $id)->first();
        return response()->json($commandePaiement, 201);
    }

    public function show($id)
    {
        // Retrieve a single commande_paiement record
        $commandePaiement = DB::table('commande_paiement')->where('id', $id)->first();
        if ($commandePaiement) {
            return response()->json($commandePaiement, 200);
        }
        return response()->json(['error' => 'Commande paiement not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing commande_paiement record
        $updated = DB::table('commande_paiement')->where('id', $id)->update($request->all());
        if ($updated) {
            $commandePaiement = DB::table('commande_paiement')->where('id', $id)->first();
            return response()->json($commandePaiement, 200);
        }
        return response()->json(['error' => 'Commande paiement not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a commande_paiement record
        $deleted = DB::table('commande_paiement')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Commande paiement deleted'], 200);
        }
        return response()->json(['error' => 'Commande paiement not found'], 404);
    }
}
