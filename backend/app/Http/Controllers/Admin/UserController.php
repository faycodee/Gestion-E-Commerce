<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function index()
    {
        $users = DB::table('users')->get();
        
        return response()->json($users);
    }
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
                'role' => 'required|in:user,admin',
            ]);
    
            DB::table('users')->insert([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
    
            return response()->json(['message' => 'User added successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    
    public function show($id)
    {
        $user = DB::table('users')->find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($user);
    }
    public function update(Request $request, $id)
{
    // استخدم فقط الحقول التي يمكن تحديثها
    $data = $request->only(['name', 'email', 'role']);
    $data['updated_at'] = now(); // تحديث تاريخ التعديل

    // إذا كان هناك كلمة مرور جديدة، أضفها
    if ($request->has('password') && $request->password) {
        $data['password'] = Hash::make($request->password);
    }

    // تحديث البيانات في قاعدة البيانات
    $updated = DB::table('users')->where('id', $id)->update($data);

    if (!$updated) {
        return response()->json(['error' => 'User not found'], 404);
    }

    return response()->json(['message' => 'User updated successfully']);
}

    public function destroy($id)
    {
        $deleted = DB::table('users')->where('id', $id)->delete();
        if (!$deleted) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json(['message' => 'User deleted successfully']);
    }
}