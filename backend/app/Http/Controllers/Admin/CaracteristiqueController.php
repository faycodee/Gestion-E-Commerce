<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Caracteristique;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CaracteristiqueController extends Controller
{
    public function index()
    {
        try {
            $caracteristiques = Caracteristique::with('produit')->get();
            return response()->json([
                'status' => 'success',
                'data' => $caracteristiques
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching caracteristiques',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'couleur' => 'required|string|max:50',
                'taille' => 'required|string|max:50',
                'produit_id' => 'required|exists:produits,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $caracteristique = Caracteristique::create($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Caracteristique created successfully',
                'data' => $caracteristique
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error creating caracteristique',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $caracteristique = Caracteristique::with('produit')->find($id);
            
            if (!$caracteristique) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Caracteristique not found'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data' => $caracteristique
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching caracteristique',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $caracteristique = Caracteristique::find($id);

            if (!$caracteristique) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Caracteristique not found'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'couleur' => 'sometimes|required|string|max:50',
                'taille' => 'sometimes|required|string|max:50',
                'produit_id' => 'sometimes|required|exists:produits,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $caracteristique->update($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Caracteristique updated successfully',
                'data' => $caracteristique
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error updating caracteristique',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $caracteristique = Caracteristique::find($id);

            if (!$caracteristique) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Caracteristique not found'
                ], 404);
            }

            $caracteristique->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Caracteristique deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error deleting caracteristique',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getByProduit($produit_id)
    {
        try {
            $caracteristiques = Caracteristique::where('produit_id', $produit_id)->get();
            return response()->json([
                'status' => 'success',
                'data' => $caracteristiques
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching caracteristiques by product',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}