<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    // عرض جميع المستخدمين
    public function index()
    {
        $users = DB::table('users')->get();
        return response()->json($users);
    }

    // عرض بيانات مستخدم معين باستخدام ID
    public function show($id)
    {
        $user = DB::table('users')->where('id', $id)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    // إنشاء مستخدم جديد
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $userId = DB::table('users')->insertGetId([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'User created successfully', 'user_id' => $userId], 201);
    }

    // تحديث بيانات مستخدم معين باستخدام ID
    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $updated = DB::table('users')
            ->where('id', $id)
            ->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => $request->password ? bcrypt($request->password) : DB::raw('password'),
                'updated_at' => now(),
            ]);

        if (!$updated) {
            return response()->json(['message' => 'User not found or no changes made'], 404);
        }

        return response()->json(['message' => 'Profile updated successfully']);
    }

    // حذف مستخدم باستخدام ID
    public function destroy($id)
    {
        $deleted = DB::table('users')->where('id', $id)->delete();

        if (!$deleted) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json(['message' => 'User deleted successfully']);
    }
}
