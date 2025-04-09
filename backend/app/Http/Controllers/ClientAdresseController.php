<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientAdresseController extends Controller
{
    public function index()
    {
        // Retrieve all client addresses
        $clientAdresses = DB::table('client_adresse')->get();
        return response()->json($clientAdresses, 200);
    }

    public function store(Request $request)
    {
        // Create a new client address
        $id = DB::table('client_adresse')->insertGetId($request->all());
        $clientAdresse = DB::table('client_adresse')->where('id', $id)->first();
        return response()->json($clientAdresse, 201);
    }

    public function show($id)
    {
        // Retrieve a single client address
        $clientAdresse = DB::table('client_adresse')->where('id', $id)->first();
        if ($clientAdresse) {
            return response()->json($clientAdresse, 200);
        }
        return response()->json(['error' => 'Client address not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing client address
        $updated = DB::table('client_adresse')->where('id', $id)->update($request->all());
        if ($updated) {
            $clientAdresse = DB::table('client_adresse')->where('id', $id)->first();
            return response()->json($clientAdresse, 200);
        }
        return response()->json(['error' => 'Client address not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a client address
        $deleted = DB::table('client_adresse')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Client address deleted'], 200);
        }
        return response()->json(['error' => 'Client address not found'], 404);
    }
}
