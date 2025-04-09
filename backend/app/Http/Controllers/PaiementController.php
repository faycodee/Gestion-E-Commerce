<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaiementController extends Controller
{
    public function index()
    {
        // Retrieve all paiements
        $paiements = DB::table('paiement')->get();
        return response()->json($paiements, 200);
    }

    public function store(Request $request)
    {
        // Create a new paiement
        $id = DB::table('paiement')->insertGetId($request->all());
        $paiement = DB::table('paiement')->where('id', $id)->first();
        return response()->json($paiement, 201);
    }

    public function show($id)
    {
        // Retrieve a single paiement
        $paiement = DB::table('paiement')->where('id', $id)->first();
        if ($paiement) {
            return response()->json($paiement, 200);
        }
        return response()->json(['error' => 'Paiement not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing paiement
        $updated = DB::table('paiement')->where('id', $id)->update($request->all());
        if ($updated) {
            $paiement = DB::table('paiement')->where('id', $id)->first();
            return response()->json($paiement, 200);
        }
        return response()->json(['error' => 'Paiement not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a paiement
        $deleted = DB::table('paiement')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Paiement deleted'], 200);
        }
        return response()->json(['error' => 'Paiement not found'], 404);
    }
}
