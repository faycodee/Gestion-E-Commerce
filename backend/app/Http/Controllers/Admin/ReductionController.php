<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ReductionController extends Controller
{
    public function index()
    {
        $reductions = DB::table('reductions')->get();
        return response()->json($reductions);
    }
    public function store(Request $request)
    {
        $request->validate([
            'code'            => 'required|string|max:100',
            'percentage'      => 'required|numeric',
            'expiration_date' => 'required|date',
        ]);
        $id = DB::table('reductions')->insertGetId([
            'code'       => $request->code,
            'percentage' => $request->percentage,
            'expiration_date' => $request->expiration_date,
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
            'code'            => 'required|string|max:100',
            'percentage'      => 'required|numeric',
            'expiration_date' => 'required|date',
        ]);
        $updated = DB::table('reductions')->where('id', $id)->update([
            'code'            => $request->code,
            'percentage'      => $request->percentage,
            'expiration_date' => $request->expiration_date,
            'updated_at'      => now(),
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