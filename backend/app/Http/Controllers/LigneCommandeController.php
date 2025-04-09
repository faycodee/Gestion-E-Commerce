<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LigneCommandeController extends Controller
{
    public function index()
    {
        // Retrieve all ligne_commande records
        $ligneCommandes = DB::table('ligne_commande')->get();
        return response()->json($ligneCommandes, 200);
    }

    public function store(Request $request)
    {
        // Create a new ligne_commande record
        $id = DB::table('ligne_commande')->insertGetId($request->all());
        $ligneCommande = DB::table('ligne_commande')->where('id', $id)->first();
        return response()->json($ligneCommande, 201);
    }

    public function show($id)
    {
        // Retrieve a single ligne_commande record
        $ligneCommande = DB::table('ligne_commande')->where('id', $id)->first();
        if ($ligneCommande) {
            return response()->json($ligneCommande, 200);
        }
        return response()->json(['error' => 'Ligne commande not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing ligne_commande record
        $updated = DB::table('ligne_commande')->where('id', $id)->update($request->all());
        if ($updated) {
            $ligneCommande = DB::table('ligne_commande')->where('id', $id)->first();
            return response()->json($ligneCommande, 200);
        }
        return response()->json(['error' => 'Ligne commande not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a ligne_commande record
        $deleted = DB::table('ligne_commande')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Ligne commande deleted'], 200);
        }
        return response()->json(['error' => 'Ligne commande not found'], 404);
    }
}
