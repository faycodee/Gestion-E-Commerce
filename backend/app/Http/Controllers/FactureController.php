<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FactureController extends Controller
{
    public function index()
    {
        // Retrieve all facture
        $facture = DB::table('facture')->get();
        return response()->json($facture, 200);
    }

    public function store(Request $request)
    {
        // Create a new facture
        $id = DB::table('facture')->insertGetId($request->all());
        $facture = DB::table('facture')->where('id', $id)->first();
        return response()->json($facture, 201);
    }

    public function show($id)
    {
        // Retrieve a single facture
        $facture = DB::table('facture')->where('id', $id)->first();
        if ($facture) {
            return response()->json($facture, 200);
        }
        return response()->json(['error' => 'Facture not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing facture
        $updated = DB::table('facture')->where('id', $id)->update($request->all());
        if ($updated) {
            $facture = DB::table('facture')->where('id', $id)->first();
            return response()->json($facture, 200);
        }
        return response()->json(['error' => 'Facture not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a facture
        $deleted = DB::table('facture')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Facture deleted'], 200);
        }
        return response()->json(['error' => 'Facture not found'], 404);
    }
}