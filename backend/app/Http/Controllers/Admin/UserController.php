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
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'name' => 'required|string|max:250',
            'email' => 'required|email|unique:users,email|max:50',
            'password' => 'required|string|min:6',
            'role' => 'required|in:user,admin',
            'tele' => 'nullable|string|max:20',
            'adresse' => 'nullable|string|max:250',
            'points_fidélité' => 'nullable|integer|min:0', // Add validation for points
        ]);

        User::create([
            'first_name' => $validated['first_name'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
            'tele' => $validated['tele'],
            'adresse' => $validated['adresse'],
            'points_fidélité' => $validated['points_fidélité'] ?? 0, // Set default value if not provided
        ]);

        return response()->json(['message' => 'User added successfully'], 201);
    }
    
    public function show($id)
    {
        \Log::info("Requested ID: " . $id); // تحقق من قيمة $id
        $user = DB::table('users')->find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'first_name' => 'sometimes|required|string|max:50',
            'name' => 'sometimes|required|string|max:250',
            'email' => 'sometimes|required|email|max:50',
            'role' => 'sometimes|required|in:user,admin',
<<<<<<< HEAD
            'tele' => 'sometimes|nullable|string|max:20', // Allow updating tele
            'adresse' => 'sometimes|nullable|string|max:250', // Allow updating adresse
            'points_fidélité' => 'sometimes|nullable|integer|min:0', // Add validation for points
=======
            'tele' => 'sometimes|nullable|string|max:20',
            'adresse' => 'sometimes|nullable|string|max:250',
            'points_fidélité' => 'sometimes|nullable|integer|min:0',
>>>>>>> 93f43bc26718e74f934e2c706e1a7668ae2e3955
        ]);

        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // If updating points, log the transaction
        if (isset($validated['points_fidélité'])) {
            $pointsDifference = $validated['points_fidélité'] - $user->points_fidélité;
            \Log::info("Points update for user {$id}: {$pointsDifference} points " . 
                      ($pointsDifference >= 0 ? "added" : "deducted"));
        }

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'points_earned' => $pointsDifference ?? 0
        ]);
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