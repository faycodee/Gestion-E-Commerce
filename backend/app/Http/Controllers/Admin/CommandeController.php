<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Commande;

class CommandeController extends Controller
{
    
    // Fetch all commandes
    public function index()
    {
        $commandes = Commande::all();
        return response()->json($commandes);
    }

    // Store a new commande
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'commentaire' => 'nullable|string|max:255',
            'date_achat' => 'required|date',
            'statut' => 'required|string|max:50',
        ]);

        $commande = Commande::create($validated);

        return response()->json(['id' => $commande->id, 'message' => 'Commande created successfully'], 201);
    }

    // Show a specific commande by ID
    public function show($id)
    {
        $commande = Commande::find($id);

        if (!$commande) {
            return response()->json(['error' => 'Commande not found'], 404);
        }

        return response()->json($commande);
    }

    // Update an existing commande
    public function update(Request $request, $id)
    {
        $commande = Commande::find($id);

        if (!$commande) {
            return response()->json(['error' => 'Commande not found'], 404);
        }

        $validated = $request->validate([
            'commentaire' => 'nullable|string|max:255',
            'date_achat' => 'sometimes|required|date',
            'statut' => 'sometimes|required|string|max:50',
        ]);

        $commande->update($validated);

        return response()->json(['message' => 'Commande updated successfully']);
    }

    // Delete a specific commande
    public function destroy($id)
    {
        $commande = Commande::find($id);

        if (!$commande) {
            return response()->json(['error' => 'Commande not found'], 404);
        }

        $commande->delete();

        return response()->json(['message' => 'Commande deleted successfully']);
    }
    
}