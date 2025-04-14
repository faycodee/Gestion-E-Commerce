<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class CommandeController extends Controller
{
    public function index()
    {
        $commandes = DB::table('commandes')->get();
        return response()->json($commandes);
    }
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'total'   => 'required|numeric',
            'status'  => 'required|string',
        ]);
        $id = DB::table('commandes')->insertGetId([
            'user_id'    => $request->user_id,
            'total'      => $request->total,
            'status'     => $request->status,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        return response()->json(['id' => $id], 201);
    }
    public function show($id)
    {
        $commande = DB::table('commandes')->find($id);
        if (!$commande) {
            return response()->json(['error' => 'Commande not found'], 404);
        }
        return response()->json($commande);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'total'  => 'sometimes|required|numeric',
            'status' => 'sometimes|required|string',
        ]);
        $updated = DB::table('commandes')->where('id', $id)->update([
            'total'      => $request->total,
            'status'     => $request->status,
            'updated_at' => now(),
        ]);
        if (!$updated) {
            return response()->json(['error' => 'Commande not found'], 404);
        }
        return response()->json(['message' => 'Commande updated successfully']);
    }
    public function destroy($id)
    {
        $deleted = DB::table('commandes')->where('id', $id)->delete();
        if (!$deleted) {
            return response()->json(['error' => 'Commande not found'], 404);
        }
        return response()->json(['message' => 'Commande deleted successfully']);
    }
}