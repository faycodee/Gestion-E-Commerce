<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategorieController extends Controller
{
    public function index()
    {
        // Retrieve all categories
        $categories = DB::table('categorie')->get();
        return response()->json($categories, 200);
    }

    public function store(Request $request)
    {
        // Create a new category
        $id = DB::table('categorie')->insertGetId($request->all());
        $categorie = DB::table('categorie')->where('id', $id)->first();
        return response()->json($categorie, 201);
    }

    public function show($id)
    {
        // Retrieve a single category
        $categorie = DB::table('categorie')->where('id', $id)->first();
        if ($categorie) {
            return response()->json($categorie, 200);
        }
        return response()->json(['error' => 'Category not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing category
        $updated = DB::table('categorie')->where('id', $id)->update($request->all());
        if ($updated) {
            $categorie = DB::table('categorie')->where('id', $id)->first();
            return response()->json($categorie, 200);
        }
        return response()->json(['error' => 'Category not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a category
        $deleted = DB::table('categorie')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Category deleted'], 200);
        }
        return response()->json(['error' => 'Category not found'], 404);
    }
}
