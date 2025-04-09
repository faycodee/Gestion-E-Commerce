<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LigneFactureController extends Controller
{
    public function index()
    {
        // Retrieve all ligne_facture records
        $ligneFactures = DB::table('ligne_facture')->get();
        return response()->json($ligneFactures, 200);
    }

    public function store(Request $request)
    {
        // Create a new ligne_facture record
        $id = DB::table('ligne_facture')->insertGetId($request->all());
        $ligneFacture = DB::table('ligne_facture')->where('id', $id)->first();
        return response()->json($ligneFacture, 201);
    }

    public function show($id)
    {
        // Retrieve a single ligne_facture record
        $ligneFacture = DB::table('ligne_facture')->where('id', $id)->first();
        if ($ligneFacture) {
            return response()->json($ligneFacture, 200);
        }
        return response()->json(['error' => 'Ligne facture not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing ligne_facture record
        $updated = DB::table('ligne_facture')->where('id', $id)->update($request->all());
        if ($updated) {
            $ligneFacture = DB::table('ligne_facture')->where('id', $id)->first();
            return response()->json($ligneFacture, 200);
        }
        return response()->json(['error' => 'Ligne facture not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a ligne_facture record
        $deleted = DB::table('ligne_facture')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Ligne facture deleted'], 200);
        }
        return response()->json(['error' => 'Ligne facture not found'], 404);
    }
}
