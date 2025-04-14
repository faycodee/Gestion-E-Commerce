<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class FactureController extends Controller
{
    public function index()
    {
        $factures = DB::table('factures')->get();
        return response()->json($factures);
    }
    public function store(Request $request)
    {
        $request->validate([
            'commande_id' => 'required|integer',
            'amount'      => 'required|numeric',
        ]);
        $id = DB::table('factures')->insertGetId([
            'commande_id' => $request->commande_id,
            'amount'      => $request->amount,
            'created_at'  => now(),
            'updated_at'  => now(),
        ]);
        return response()->json(['id' => $id], 201);
    }
    public function show($id)
    {
        $facture = DB::table('factures')->find($id);
        if (!$facture) {
            return response()->json(['error' => 'Facture not found'], 404);
        }
        return response()->json($facture);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'amount' => 'required|numeric',
        ]);
        $updated = DB::table('factures')->where('id', $id)->update([
            'amount'      => $request->amount,
            'updated_at'  => now(),
        ]);
        if (!$updated) {
            return response()->json(['error' => 'Facture not found'], 404);
        }
        return response()->json(['message' => 'Facture updated successfully']);
    }
    public function destroy($id)
    {
        $deleted = DB::table('factures')->where('id', $id)->delete();
        if (!$deleted) {
            return response()->json(['error' => 'Facture not found'], 404);
        }
        return response()->json(['message' => 'Facture deleted successfully']);
    }
}