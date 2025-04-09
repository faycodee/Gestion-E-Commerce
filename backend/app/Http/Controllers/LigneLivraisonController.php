<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LigneLivraisonController extends Controller
{
    public function index()
    {
        // Retrieve all ligne_livraison records
        $ligneLivraisons = DB::table('ligne_livraison')->get();
        return response()->json($ligneLivraisons, 200);
    }

    public function store(Request $request)
    {
        // Create a new ligne_livraison record
        $id = DB::table('ligne_livraison')->insertGetId($request->all());
        $ligneLivraison = DB::table('ligne_livraison')->where('id', $id)->first();
        return response()->json($ligneLivraison, 201);
    }

    public function show($id)
    {
        // Retrieve a single ligne_livraison record
        $ligneLivraison = DB::table('ligne_livraison')->where('id', $id)->first();
        if ($ligneLivraison) {
            return response()->json($ligneLivraison, 200);
        }
        return response()->json(['error' => 'Ligne livraison not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing ligne_livraison record
        $updated = DB::table('ligne_livraison')->where('id', $id)->update($request->all());
        if ($updated) {
            $ligneLivraison = DB::table('ligne_livraison')->where('id', $id)->first();
            return response()->json($ligneLivraison, 200);
        }
        return response()->json(['error' => 'Ligne livraison not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a ligne_livraison record
        $deleted = DB::table('ligne_livraison')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Ligne livraison deleted'], 200);
        }
        return response()->json(['error' => 'Ligne livraison not found'], 404);
    }
}
