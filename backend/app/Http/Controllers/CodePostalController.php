<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CodePostalController extends Controller
{
    public function index()
    {
        // Retrieve all code_postal records
        $codesPostaux = DB::table('code_postal')->get();
        return response()->json($codesPostaux, 200);
    }

    public function store(Request $request)
    {
        // Create a new code_postal record
        $id = DB::table('code_postal')->insertGetId($request->all());
        $codePostal = DB::table('code_postal')->where('id', $id)->first();
        return response()->json($codePostal, 201);
    }

    public function show($id)
    {
        // Retrieve a single code_postal record
        $codePostal = DB::table('code_postal')->where('id', $id)->first();
        if ($codePostal) {
            return response()->json($codePostal, 200);
        }
        return response()->json(['error' => 'Code postal not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing code_postal record
        $updated = DB::table('code_postal')->where('id', $id)->update($request->all());
        if ($updated) {
            $codePostal = DB::table('code_postal')->where('id', $id)->first();
            return response()->json($codePostal, 200);
        }
        return response()->json(['error' => 'Code postal not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a code_postal record
        $deleted = DB::table('code_postal')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Code postal deleted'], 200);
        }
        return response()->json(['error' => 'Code postal not found'], 404);
    }
}
