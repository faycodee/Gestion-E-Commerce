<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FournisseurController extends Controller
{
    public function index()
    {
        // Retrieve all fournisseurs
        $fournisseurs = DB::table('fournisseur')->get();
        return response()->json($fournisseurs, 200);
    }

    public function store(Request $request)
    {
        // Create a new fournisseur
        $id = DB::table('fournisseur')->insertGetId($request->all());
        $fournisseur = DB::table('fournisseur')->where('id', $id)->first();
        return response()->json($fournisseur, 201);
    }

    public function show($id)
    {
        // Retrieve a single fournisseur
        $fournisseur = DB::table('fournisseur')->where('id', $id)->first();
        if ($fournisseur) {
            return response()->json($fournisseur, 200);
        }
        return response()->json(['error' => 'Fournisseur not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing fournisseur
        $updated = DB::table('fournisseur')->where('id', $id)->update($request->all());
        if ($updated) {
            $fournisseur = DB::table('fournisseur')->where('id', $id)->first();
            return response()->json($fournisseur, 200);
        }
        return response()->json(['error' => 'Fournisseur not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a fournisseur
        $deleted = DB::table('fournisseur')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Fournisseur deleted'], 200);
        }
        return response()->json(['error' => 'Fournisseur not found'], 404);
    }
}
