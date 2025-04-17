<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommandeController extends Controller
{
    // عرض جميع الطلبات
    public function index()
    {
        $commandes = DB::table('commandes')->get();
        return response()->json($commandes);
    }

    // عرض طلب معين باستخدام ID
    public function show($id)
    {
        $commande = DB::table('commandes')->where('id', $id)->first();
        if (!$commande) {
            return response()->json(['message' => 'Commande not found'], 404);
        }
        return response()->json($commande);
    }

    // إضافة طلب جديد
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'status' => 'required|string',
            'commentaire' => 'nullable|string',
        ]);

        DB::table('commandes')->insert([
            'user_id' => $request->user_id,
            'status' => $request->status,
            'commentaire' => $request->commentaire,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Commande created successfully'], 201);
    }

    // تحديث طلب باستخدام ID
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'commentaire' => 'nullable|string',
        ]);

        $updated = DB::table('commandes')
            ->where('id', $id)
            ->update([
                'status' => $request->status,
                'commentaire' => $request->commentaire,
                'updated_at' => now(),
            ]);

        if (!$updated) {
            return response()->json(['message' => 'Commande not found'], 404);
        }

        return response()->json(['message' => 'Commande updated successfully']);
    }

    // حذف طلب باستخدام ID
    public function destroy($id)
    {
        $deleted = DB::table('commandes')->where('id', $id)->delete();

        if (!$deleted) {
            return response()->json(['message' => 'Commande not found'], 404);
        }

        return response()->json(['message' => 'Commande deleted successfully']);
    }
}
