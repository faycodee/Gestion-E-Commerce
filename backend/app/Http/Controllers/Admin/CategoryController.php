<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Get all categories.
     */
    public function index()
    {
        $categories = DB::table('categories')->get();
        return response()->json($categories, 200);
    }

    /**
     * Get a single category by ID.
     */
    public function show($id)
    {
        $category = DB::table('categories')->where('id', $id)->first();
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json($category, 200);
    }

    /**
     * Create a new category.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $id = DB::table('categories')->insertGetId([
            'nom' => $request->nom,
            'description' => $request->description,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Category created successfully', 'id' => $id], 201);
    }

    /**
     * Update an existing category.
     */
    public function update(Request $request, $id)
    {
        $category = DB::table('categories')->where('id', $id)->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $request->validate([
            'nom' => 'string|max:255',
            'description' => 'nullable|string',
        ]);

        DB::table('categories')->where('id', $id)->update([
            'nom' => $request->nom ?? $category->nom,
            'description' => $request->description ?? $category->description,
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Category updated successfully'], 200);
    }

    /**
     * Delete a category.
     */
    public function destroy($id)
    {
        $category = DB::table('categories')->where('id', $id)->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        DB::table('categories')->where('id', $id)->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}
