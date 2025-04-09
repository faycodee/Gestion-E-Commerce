<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategorieImageController extends Controller
{
    public function index()
    {
        // Retrieve all categorie images
        $categorieImages = DB::table('categorie_image')->get();
        return response()->json($categorieImages, 200);
    }

    public function store(Request $request)
    {
        // Create a new categorie image
        $id = DB::table('categorie_image')->insertGetId($request->all());
        $categorieImage = DB::table('categorie_image')->where('id', $id)->first();
        return response()->json($categorieImage, 201);
    }

    public function show($id)
    {
        // Retrieve a single categorie image
        $categorieImage = DB::table('categorie_image')->where('id', $id)->first();
        if ($categorieImage) {
            return response()->json($categorieImage, 200);
        }
        return response()->json(['error' => 'Categorie image not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing categorie image
        $updated = DB::table('categorie_image')->where('id', $id)->update($request->all());
        if ($updated) {
            $categorieImage = DB::table('categorie_image')->where('id', $id)->first();
            return response()->json($categorieImage, 200);
        }
        return response()->json(['error' => 'Categorie image not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a categorie image
        $deleted = DB::table('categorie_image')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'Categorie image deleted'], 200);
        }
        return response()->json(['error' => 'Categorie image not found'], 404);
    }
}
