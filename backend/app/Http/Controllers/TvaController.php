<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TvaController extends Controller
{
    public function index()
    {
        // Retrieve all TVA records
        $tvas = DB::table('tva')->get();
        return response()->json($tvas, 200);
    }

    public function store(Request $request)
    {
        // Create a new TVA record
        $id = DB::table('tva')->insertGetId($request->all());
        $tva = DB::table('tva')->where('id', $id)->first();
        return response()->json($tva, 201);
    }

    public function show($id)
    {
        // Retrieve a single TVA record
        $tva = DB::table('tva')->where('id', $id)->first();
        if ($tva) {
            return response()->json($tva, 200);
        }
        return response()->json(['error' => 'TVA not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing TVA record
        $updated = DB::table('tva')->where('id', $id)->update($request->all());
        if ($updated) {
            $tva = DB::table('tva')->where('id', $id)->first();
            return response()->json($tva, 200);
        }
        return response()->json(['error' => 'TVA not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a TVA record
        $deleted = DB::table('tva')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'TVA deleted'], 200);
        }
        return response()->json(['error' => 'TVA not found'], 404);
    }
}
