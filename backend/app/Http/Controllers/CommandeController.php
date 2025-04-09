<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommandeController extends Controller
{
    public function index()
    {
        // Retrieve all commandes
        $commandes = DB::table('commande')->get();
        return response()->json($commandes, 200);
    }

    public function store(Request $request)
    {
        // Create a new commande
        $id = DB::table('commande')->insertGetId($request->all());
        $commande = DB::table('commande')->where('id', $id)->first();
        return response()->json($commande, 201);
    }

    public function show($id)
    {
        // Retrieve a single commande
        $commande = DB::table('commande')->where('id', $id)->first();
        if ($commande) {
            return response()->json($commande, 200);
        }
        return response()->json(['error' => 'Commande not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing commande
        $updated = DB::table('commande')->where('id', $id)->update($request->all());
        if ($updated) {
            $commande = DB::table('commande')->where('id', $id)->first();
            return response()->json($commande, 200);
        }
        return response()->json(['error' => 'Commande not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a commande
        $deleted = DB::table('commande')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Commande deleted'], 200);
        }
        return response()->json(['error' => 'Commande not found'], 404);
    }
}