<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PanierController extends Controller
{
    public function index()
    {
        // Retrieve all paniers
        $paniers = DB::table('panier')->get();
        return response()->json($paniers, 200);
    }

    public function store(Request $request)
    {
        // Create a new panier
        $id = DB::table('panier')->insertGetId($request->all());
        $panier = DB::table('panier')->where('id', $id)->first();
        return response()->json($panier, 201);
    }

    public function show($id)
    {
        // Retrieve a single panier
        $panier = DB::table('panier')->where('id', $id)->first();
        if ($panier) {
            return response()->json($panier, 200);
        }
        return response()->json(['error' => 'Panier not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing panier
        $updated = DB::table('panier')->where('id', $id)->update($request->all());
        if ($updated) {
            $panier = DB::table('panier')->where('id', $id)->first();
            return response()->json($panier, 200);
        }
        return response()->json(['error' => 'Panier not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a panier
        $deleted = DB::table('panier')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Panier deleted'], 200);
        }
        return response()->json(['error' => 'Panier not found'], 404);
    }
}
