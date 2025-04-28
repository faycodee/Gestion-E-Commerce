<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReductionProduit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReductionProduitController extends Controller
{
    public function index()
    {
        try {
            $reductionProduits = ReductionProduit::get();
            return response()->json([
                'status' => 'success',
                'data' => $reductionProduits
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching reduction produits',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'produit_id' => 'required|exists:produits,id',
                'reduction_id' => 'required|exists:reductions,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $reductionProduit = ReductionProduit::create($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Reduction produit created successfully',
                'data' => $reductionProduit
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error creating reduction produit',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $reductionProduit = ReductionProduit::with(['produit', 'reduction'])->find($id);
            
            if (!$reductionProduit) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Reduction produit not found'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data' => $reductionProduit
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching reduction produit',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $reductionProduit = ReductionProduit::find($id);

            if (!$reductionProduit) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Reduction produit not found'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'produit_id' => 'exists:produits,id',
                'reduction_id' => 'exists:reductions,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $reductionProduit->update($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Reduction produit updated successfully',
                'data' => $reductionProduit
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error updating reduction produit',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $reductionProduit = ReductionProduit::find($id);

            if (!$reductionProduit) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Reduction produit not found'
                ], 404);
            }

            $reductionProduit->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Reduction produit deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error deleting reduction produit',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}