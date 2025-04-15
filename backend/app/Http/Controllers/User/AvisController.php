<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AvisController extends Controller
{
    // عرض جميع التقييمات
    public function index()
    {
        $avis = DB::table('avis')->get();
        return response()->json($avis);
    }

    // عرض تقييم معين باستخدام ID
    public function show($id)
    {
        $avis = DB::table('avis')->where('id', $id)->first();
        if (!$avis) {
            return response()->json(['message' => 'Avis not found'], 404);
        }
        return response()->json($avis);
    }

    // إضافة تقييم جديد
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'produit_id' => 'required|integer',
            'notation' => 'required|integer',
            'avis' => 'nullable|string',
            'titre' => 'nullable|string',
        ]);

        DB::table('avis')->insert([
            'user_id' => $request->user_id,
            'produit_id' => $request->produit_id,
            'notation' => $request->notation,
            'avis' => $request->avis,
            'titre' => $request->titre,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Avis created successfully'], 201);
    }

    // تحديث التقييم باستخدام ID
    public function update(Request $request, $id)
    {
        $request->validate([
            'notation' => 'required|integer',
            'avis' => 'nullable|string',
            'titre' => 'nullable|string',
        ]);

        $updated = DB::table('avis')
            ->where('id', $id)
            ->update([
                'notation' => $request->notation,
                'avis' => $request->avis,
                'titre' => $request->titre,
                'updated_at' => now(),
            ]);

        if (!$updated) {
            return response()->json(['message' => 'Avis not found'], 404);
        }

        return response()->json(['message' => 'Avis updated successfully']);
    }

    // حذف التقييم باستخدام ID
    public function destroy($id)
    {
        $deleted = DB::table('avis')->where('id', $id)->delete();

        if (!$deleted) {
            return response()->json(['message' => 'Avis not found'], 404);
        }

        return response()->json(['message' => 'Avis deleted successfully']);
    }
}
