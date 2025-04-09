<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VilleController extends Controller
{
    public function index()
    {
        // Retrieve all villes
        $villes = DB::table('ville')->get();
        return response()->json($villes, 200);
    }

    public function store(Request $request)
    {
        // Create a new ville
        $id = DB::table('ville')->insertGetId($request->all());
        $ville = DB::table('ville')->where('id', $id)->first();
        return response()->json($ville, 201);
    }

    public function show($id)
    {
        // Retrieve a single ville
        $ville = DB::table('ville')->where('id', $id)->first();
        if ($ville) {
            return response()->json($ville, 200);
        }
        return response()->json(['error' => 'Ville not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing ville
        $updated = DB::table('ville')->where('id', $id)->update($request->all());
        if ($updated) {
            $ville = DB::table('ville')->where('id', $id)->first();
            return response()->json($ville, 200);
        }
        return response()->json(['error' => 'Ville not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a ville
        $deleted = DB::table('ville')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Ville deleted'], 200);
        }
        return response()->json(['error' => 'Ville not found'], 404);
    }
}
