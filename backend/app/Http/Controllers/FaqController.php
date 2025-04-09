<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FaqController extends Controller
{
    public function index()
    {
        // Retrieve all faq
        $faq = DB::table('faq')->get();
        return response()->json($faq, 200);
    }

    public function store(Request $request)
    {
        // Create a new FAQ
        $id = DB::table('faq')->insertGetId($request->all());
        $faq = DB::table('faq')->where('id', $id)->first();
        return response()->json($faq, 201);
    }

    public function show($id)
    {
        // Retrieve a single FAQ
        $faq = DB::table('faq')->where('id', $id)->first();
        if ($faq) {
            return response()->json($faq, 200);
        }
        return response()->json(['error' => 'FAQ not found'], 404);
    }

    public function update(Request $request, $id)
    {
        // Update an existing FAQ
        $updated = DB::table('faq')->where('id', $id)->update($request->all());
        if ($updated) {
            $faq = DB::table('faq')->where('id', $id)->first();
            return response()->json($faq, 200);
        }
        return response()->json(['error' => 'FAQ not found'], 404);
    }

    public function destroy($id)
    {
        // Delete a FAQ
        $deleted = DB::table('faq')->where('id', $id)->delete();
        if ($deleted) {
            return response()->json(['message' => 'FAQ deleted'], 200);
        }
        return response()->json(['error' => 'FAQ not found'], 404);
    }
}