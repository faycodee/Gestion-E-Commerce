<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PrivilegeController extends Controller
{
    public function index()
    {
        // Retrieve all privileges
        $privileges = DB::table('privilege')->get();
        return response()->json($privileges, 200);
    }

    public function store(Request $request)
    {
        // Create a new privilege
        $id = DB::table('privilege')->insertGetId($request->all());
        $privilege = DB::table('privilege')->where('id', $id)->first();
        return response()->json($privilege, 201);
    }

    public function show($id)
    {
        // Retrieve a single privilege
        $privilege = DB::table('privilege')->where('id', $id)->first();
        if ($privilege) {
            return response()->json($privilege, 200);
        }
        return response()->json(['error' => 'Privilege not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing privilege
        $updated = DB::table('privilege')->where('id', $id)->update($request->all());
        if ($updated) {
            $privilege = DB::table('privilege')->where('id', $id)->first();
            return response()->json($privilege, 200);
        }
        return response()->json(['error' => 'Privilege not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a privilege
        $deleted = DB::table('privilege')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Privilege deleted'], 200);
        }
        return response()->json(['error' => 'Privilege not found'], 404);
    }
}
