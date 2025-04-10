<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockController extends Controller
{
    public function index()
    {
        // Retrieve all stock records
        $stocks = DB::table('stock')->get();
        return response()->json($stocks, 200);
    }

    public function store(Request $request)
    {
        // Create a new stock record
        $id = DB::table('stock')->insertGetId($request->all());
        $stock = DB::table('stock')->where('id', $id)->first();
        return response()->json($stock, 201);
    }

    public function show($id)
    {
        // Retrieve a single stock record
        $stock = DB::table('stock')->where('id', $id)->first();
        if ($stock) {
            return response()->json($stock, 200);
        }
        return response()->json(['error' => 'Stock not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing stock record
        $updated = DB::table('stock')->where('id', $id)->update($request->all());
        if ($updated) {
            $stock = DB::table('stock')->where('id', $id)->first();
            return response()->json($stock, 200);
        }
        return response()->json(['error' => 'Stock not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a stock record
        $deleted = DB::table('stock')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Stock deleted'], 200);
        }
        return response()->json(['error' => 'Stock not found'], 404);
    }
}
