<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage; // Add this import

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
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image', // Allow image uploads up to 2MB
        ]);

        $imagePath = '';
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
        }

        $id = DB::table('categories')->insertGetId([
            'nom' => $validatedData['nom'],
            'description' => $validatedData['description'],
            'image' => $imagePath,
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
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image',
        ]);

        $category = DB::table('categories')->where('id', $id)->first();
        
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $imagePath = $category->image; // Keep existing image by default
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($category->image && Storage::disk('public')->exists($category->image)) {
                Storage::disk('public')->delete($category->image);
            }
            // Store new image
            $imagePath = $request->file('image')->store('categories', 'public');
        }

        DB::table('categories')->where('id', $id)->update([
            'nom' => $validatedData['nom'],
            'description' => $validatedData['description'],
            'image' => $imagePath,
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
