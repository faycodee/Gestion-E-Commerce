<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TvaController extends Controller
{
    /**
     * Get all TVA records.
     */
    public function index()
    {
        $tvas = DB::table('tvas')->get();
        return response()->json($tvas, 200);
    }

    /**
     * Store a new TVA record.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'rate' => 'required|numeric|min:0',
        ]);

        $id = DB::table('tvas')->insertGetId([
            'name' => $request->input('name'),
            'rate' => $request->input('rate'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'TVA created successfully', 'id' => $id], 201);
    }

    /**
     * Show a specific TVA record.
     */
    public function show($id)
    {
        $tva = DB::table('tvas')->where('id', $id)->first();

        if (!$tva) {
            return response()->json(['message' => 'TVA not found'], 404);
        }

        return response()->json($tva, 200);
    }

    /**
     * Update a specific TVA record.
     */
    public function update(Request $request, $id)
    {
        $tva = DB::table('tvas')->where('id', $id)->first();

        if (!$tva) {
            return response()->json(['message' => 'TVA not found'], 404);
        }

        DB::table('tvas')->where('id', $id)->update([
            'name' => $request->input('name', $tva->name),
            'rate' => $request->input('rate', $tva->rate),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'TVA updated successfully'], 200);
    }

    /**
     * Delete a specific TVA record.
     */
    public function destroy($id)
    {
        $tva = DB::table('tvas')->where('id', $id)->first();

        if (!$tva) {
            return response()->json(['message' => 'TVA not found'], 404);
        }

        DB::table('tvas')->where('id', $id)->delete();

        return response()->json(['message' => 'TVA deleted successfully'], 200);
    }
}
