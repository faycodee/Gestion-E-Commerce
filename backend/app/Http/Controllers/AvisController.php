<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AvisController extends Controller
{
    public function index()
    {
        // Retrieve all avis records
        $avis = DB::table('avis')->get();
        return response()->json($avis, 200);
    }

    public function store(Request $request)
    {
        // Create a new avis record
        $id = DB::table('avis')->insertGetId($request->all());
        $avis = DB::table('avis')->where('id', $id)->first();
        return response()->json($avis, 201);
    }

    public function show($id)
    {
        // Retrieve a single avis record
        $avis = DB::table('avis')->where('id', $id)->first();
        if ($avis) {
            return response()->json($avis, 200);
        }
        return response()->json(['error' => 'Avis not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing avis record
        $updated = DB::table('avis')->where('id', $id)->update($request->all());
        if ($updated) {
            $avis = DB::table('avis')->where('id', $id)->first();
            return response()->json($avis, 200);
        }
        return response()->json(['error' => 'Avis not found'], 404);
    }

    public function destroy($id)
    {
        // Delete an avis record
        $deleted = DB::table('avis')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Avis deleted'], 200);
        }
        return response()->json(['error' => 'Avis not found'], 404);
    }
}
