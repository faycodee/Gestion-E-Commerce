<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LivraisonController extends Controller
{
    public function index()
    {
        // Retrieve all livraison
        $livraison = DB::table('livraison')->get();
        return response()->json($livraison, 200);
    }

    public function store(Request $request)
    {
        // Create a new livraison
        $id = DB::table('livraison')->insertGetId($request->all());
        $livraison = DB::table('livraison')->where('id', $id)->first();
        return response()->json($livraison, 201);
    }

    public function show($id)
    {
        // Retrieve a single livraison
        $livraison = DB::table('livraison')->where('id', $id)->first();
        if ($livraison) {
            return response()->json($livraison, 200);
        }
        return response()->json(['error' => 'Livraison not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing livraison
        $updated = DB::table('livraison')->where('id', $id)->update($request->all());
        if ($updated) {
            $livraison = DB::table('livraison')->where('id', $id)->first();
            return response()->json($livraison, 200);
        }
        return response()->json(['error' => 'Livraison not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a livraison
        $deleted = DB::table('livraison')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Livraison deleted'], 200);
        }
        return response()->json(['error' => 'Livraison not found'], 404);
    }
}