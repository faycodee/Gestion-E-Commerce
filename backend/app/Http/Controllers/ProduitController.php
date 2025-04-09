<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProduitController extends Controller
{
    public function index()
    {
        $produit = DB::table('produit')->get();
        return response()->json($produit, 200);
    }

    public function store(Request $request)
    {
        $id = DB::table('produit')->insertGetId($request->all());
        $produit = DB::table('produit')->where('id', $id)->first();
        return response()->json($produit, 201);
    }

    public function show($id)
    {
        $produit = DB::table('produit')->where('id', $id)->first();
        if ($produit) {
            return response()->json($produit, 200);
        }
        return response()->json(['error' => 'Product not found'], 404);
    }

    public function update(Request $request, $id)
    {
        $updated = DB::table('produit')->where('id', $id)->update($request->all());
        if ($updated) {
            $produit = DB::table('produit')->where('id', $id)->first();
            return response()->json($produit, 200);
        }
        return response()->json(['error' => 'Product not found'], 404);
    }

    public function destroy($id)
    {
        $deleted = DB::table('produit')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Product deleted'], 200);
        }
        return response()->json(['error' => 'Product not found'], 404);
    }
}