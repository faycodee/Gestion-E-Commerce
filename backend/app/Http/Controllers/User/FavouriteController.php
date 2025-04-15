<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavouriteController extends Controller
{
    // عرض المفضلات
    public function index()
    {
        $favourites = DB::table('favourites')->get();
        return response()->json($favourites);
    }

    // إضافة منتج إلى المفضلات
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'produit_id' => 'required|integer',
        ]);

        DB::table('favourites')->insert([
            'user_id' => $request->user_id,
            'produit_id' => $request->produit_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Produit added to favourites successfully'], 201);
    }

    // حذف منتج من المفضلات
    public function destroy($id)
    {
        $deleted = DB::table('favourites')->where('id', $id)->delete();

        if (!$deleted) {
            return response()->json(['message' => 'Favourite not found'], 404);
        }

        return response()->json(['message' => 'Favourite deleted successfully']);
    }
}
