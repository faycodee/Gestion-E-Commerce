<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LignePanierController extends Controller
{
    public function index()
    {
        // Retrieve all ligne_panier records
        $lignePaniers = DB::table('ligne_panier')->get();
        return response()->json($lignePaniers, 200);
    }

    public function store(Request $request)
    {
        // Create a new ligne_panier record
        $id = DB::table('ligne_panier')->insertGetId($request->all());
        $lignePanier = DB::table('ligne_panier')->where('id', $id)->first();
        return response()->json($lignePanier, 201);
    }

    public function show($id)
    {
        // Retrieve a single ligne_panier record
        $lignePanier = DB::table('ligne_panier')->where('id', $id)->first();
        if ($lignePanier) {
            return response()->json($lignePanier, 200);
        }
        return response()->json(['error' => 'Ligne panier not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing ligne_panier record
        $updated = DB::table('ligne_panier')->where('id', $id)->update($request->all());
        if ($updated) {
            $lignePanier = DB::table('ligne_panier')->where('id', $id)->first();
            return response()->json($lignePanier, 200);
        }
        return response()->json(['error' => 'Ligne panier not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a ligne_panier record
        $deleted = DB::table('ligne_panier')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Ligne panier deleted'], 200);
        }
        return response()->json(['error' => 'Ligne panier not found'], 404);
    }
}
