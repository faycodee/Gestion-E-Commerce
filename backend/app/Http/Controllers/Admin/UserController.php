<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = DB::table('users')->get();
        
        return response()->json($users);
    }

    public function store(Request $request)
    { dd($request->all());
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'name' => 'required|string|max:250',
            'email' => 'required|email|unique:users,email|max:50',
            'password' => 'required|string|min:6',
            'role' => 'required|in:user,admin',
            'tele' => 'nullable|string|max:20',
            'adresse' => 'nullable|string|max:250',
        ]);

        User::create([
            'first_name' => $validated['first_name'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
            'tele' => $validated['tele'],
            'adresse' => $validated['adresse'],
        ]);

        return response()->json(['message' => 'User added successfully'], 201);
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
        $data = $request->only(['first_name', 'name', 'email', 'role']);
        $data['updated_at'] = now();

        if ($request->has('password') && $request->password) {
            $data['password'] = Hash::make($request->password);
        }

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