<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PanierController extends Controller
{
    // عرض سلة التسوق
    public function index()
    {
        $paniers = DB::table('paniers')->get();
        return response()->json($paniers);
    }

    // إضافة منتج إلى سلة التسوق
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer|unique:paniers',
           
        ]);

        $panier = DB::table('paniers')->insert([
            'user_id' => $request->user_id,
            'montant' => $request->montant,
          
        ]);

        // Fetch the created panier to return it
        $createdPanier = DB::table('paniers')
            ->where('user_id', $request->user_id)
            ->first();

        return response()->json($createdPanier, 201);
    }

    // حذف منتج من سلة التسوق
    public function destroy($id)
    {
        $deleted = DB::table('paniers')->where('id', $id)->delete();

        if (!$deleted) {
            return response()->json(['message' => 'Panier not found'], 404);
        }

        return response()->json(['message' => 'Panier deleted successfully']);
    }
}
