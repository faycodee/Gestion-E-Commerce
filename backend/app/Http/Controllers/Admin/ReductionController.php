<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReductionController extends Controller
{
    public function index()
    {
        $reductions = DB::table('reductions')->paginate(10); // Pagination
        return response()->json($reductions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:50',
            'pourcentage_reduction' => 'required|string|max:50',
            'actif' => 'required|boolean',
            'periode_reduction' => 'nullable|date',
        ]);

        $id = DB::table('reductions')->insertGetId([
            'nom' => $request->nom,
            'pourcentage_reduction' => $request->pourcentage_reduction,
            'actif' => $request->actif,
            'periode_reduction' => $request->periode_reduction,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['id' => $id], 201);
    }

    public function show($id)
    {
        $reduction = DB::table('reductions')->find($id);
        if (!$reduction) {
            return response()->json(['error' => 'Reduction not found'], 404);
        }
        return response()->json($reduction);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'required|string|max:50',
            'pourcentage_reduction' => 'required|string|max:50',
            'actif' => 'required|boolean',
            'periode_reduction' => 'nullable|date',
        ]);

        $updated = DB::table('reductions')->where('id', $id)->update([
            'nom' => $request->nom,
            'pourcentage_reduction' => $request->pourcentage_reduction,
            'actif' => $request->actif,
            'periode_reduction' => $request->periode_reduction,
            'updated_at' => now(),
        ]);

        if (!$updated) {
            return response()->json(['error' => 'Reduction not found'], 404);
        }

        return response()->json(['message' => 'Reduction updated successfully']);
    }

    public function destroy($id)
    {
        $deleted = DB::table('reductions')->where('id', $id)->delete();
        if (!$deleted) {
            return response()->json(['error' => 'Reduction not found'], 404);
        }

        return response()->json(['message' => 'Reduction deleted successfully']);
    }
}