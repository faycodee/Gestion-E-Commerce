<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    public function index()
    {
        // Retrieve all clients
        $clients = DB::table('client')->get();
        return response()->json($clients, 200);
    }

    public function store(Request $request)
    {
        // Create a new client
        $id = DB::table('client')->insertGetId($request->all());
        $client = DB::table('client')->where('id', $id)->first();
        return response()->json($client, 201);
    }

    public function show($id)
    {
        // Retrieve a single client
        $client = DB::table('client')->where('id', $id)->first();
        if ($client) {
            return response()->json($client, 200);
        }
        return response()->json(['error' => 'Client not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing client
        $updated = DB::table('client')->where('id', $id)->update($request->all());
        if ($updated) {
            $client = DB::table('client')->where('id', $id)->first();
            return response()->json($client, 200);
        }
        return response()->json(['error' => 'Client not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a client
        $deleted = DB::table('client')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Client deleted'], 200);
        }
        return response()->json(['error' => 'Client not found'], 404);
    }
}