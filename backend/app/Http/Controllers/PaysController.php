<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaysController extends Controller
{
    public function index()
    {
        // Retrieve all pays
        $pays = DB::table('pays')->get();
        return response()->json($pays, 200);
    }

    public function store(Request $request)
    {
        // Create a new pays
        $id = DB::table('pays')->insertGetId($request->all());
        $pays = DB::table('pays')->where('id', $id)->first();
        return response()->json($pays, 201);
    }

    public function show($id)
    {
        // Retrieve a single pays
        $pays = DB::table('pays')->where('id', $id)->first();
        if ($pays) {
            return response()->json($pays, 200);
        }
        return response()->json(['error' => 'Pays not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing pays
        $updated = DB::table('pays')->where('id', $id)->update($request->all());
        if ($updated) {
            $pays = DB::table('pays')->where('id', $id)->first();
            return response()->json($pays, 200);
        }
        return response()->json(['error' => 'Pays not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a pays
        $deleted = DB::table('pays')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Pays deleted'], 200);
        }
        return response()->json(['error' => 'Pays not found'], 404);
    }
}
