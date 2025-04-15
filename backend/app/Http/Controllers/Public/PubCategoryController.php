<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PubCategoryController extends Controller
{
    // عرض جميع الفئات
    public function index()
    {
        $categories = DB::table('categories')->get();
        return response()->json($categories);
    }

    // عرض فئة معينة باستخدام ID
    public function show($id)
    {
        $category = DB::table('categories')->where('id', $id)->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json($category);
    }
}
