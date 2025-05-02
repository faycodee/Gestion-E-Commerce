<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CaracteristiqueController extends Controller
{
    public function index()
    {
        try {
            $caracteristiques = DB::table('caracteristiques')
                ->leftJoin('produits', 'caracteristiques.produit_id', '=', 'produits.id')
                ->select(
                    'caracteristiques.*',
                    'produits.nom as produit_nom',
                    'produits.description as produit_description'
                )
                ->get();

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

            $id = DB::table('caracteristiques')->insertGetId([
                'couleur' => $request->input('couleur'),
                'taille' => $request->input('taille'),
                'produit_id' => $request->input('produit_id'),
                'created_at' => now(),
                'updated_at' => now()
            ]);

            $caracteristique = DB::table('caracteristiques')->where('id', $id)->first();

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
            $caracteristique = DB::table('caracteristiques')
                ->leftJoin('produits', 'caracteristiques.produit_id', '=', 'produits.id')
                ->select(
                    'caracteristiques.*',
                    'produits.nom as produit_nom',
                    'produits.description as produit_description'
                )
                ->where('caracteristiques.id', $id)
                ->first();

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

            $caracteristique = DB::table('caracteristiques')->where('id', $id)->first();

            if (!$caracteristique) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Caracteristique not found'
                ], 404);
            }

            DB::table('caracteristiques')
                ->where('id', $id)
                ->update([
                    'couleur' => $request->input('couleur', $caracteristique->couleur),
                    'taille' => $request->input('taille', $caracteristique->taille),
                    'produit_id' => $request->input('produit_id', $caracteristique->produit_id),
                    'updated_at' => now()
                ]);

            $updatedCaracteristique = DB::table('caracteristiques')->where('id', $id)->first();

            return response()->json([
                'status' => 'success',
                'message' => 'Caracteristique updated successfully',
                'data' => $updatedCaracteristique
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
            $caracteristique = DB::table('caracteristiques')->where('id', $id)->first();

            if (!$caracteristique) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Caracteristique not found'
                ], 404);
            }

            DB::table('caracteristiques')->where('id', $id)->delete();

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
            $caracteristiques = DB::table('caracteristiques')
                ->where('produit_id', $produit_id)
                ->get();

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