<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReductionController extends Controller
{
    public function index()
    {
        // Retrieve all reductions
        $reductions = DB::table('reduction')->get();
        return response()->json($reductions, 200);
    }

    public function store(Request $request)
    {
        // Create a new reduction
        $id = DB::table('reduction')->insertGetId($request->all());
        $reduction = DB::table('reduction')->where('id', $id)->first();
        return response()->json($reduction, 201);
    }

    public function show($id)
    {
        // Retrieve a single reduction
        $reduction = DB::table('reduction')->where('id', $id)->first();
        if ($reduction) {
            return response()->json($reduction, 200);
        }
        return response()->json(['error' => 'Reduction not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing reduction
        $updated = DB::table('reduction')->where('id', $id)->update($request->all());
        if ($updated) {
            $reduction = DB::table('reduction')->where('id', $id)->first();
            return response()->json($reduction, 200);
        }
        return response()->json(['error' => 'Reduction not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a reduction
        $deleted = DB::table('reduction')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Reduction deleted'], 200);
        }
        return response()->json(['error' => 'Reduction not found'], 404);
    }
}
