<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CouponController extends Controller
{
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'discount_percentage' => 'required|integer|min:1|max:100',
            'expiry_days' => 'required|integer|min:1'
        ]);

        $coupon = Coupon::create([
            'code' => strtoupper(Str::random(8)),
            'discount_percentage' => $validated['discount_percentage'],
            'is_used' => false,
            'expiry_date' => now()->addDays($validated['expiry_days'])
        ]);

        return response()->json($coupon, 201);
    }

    public function validate(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string'
        ]);

        $coupon = Coupon::where('code', $validated['code'])
            ->where('is_used', false)
            ->where('expiry_date', '>', now())
            ->first();

        if (!$coupon) {
            return response()->json([
                'message' => 'Invalid or expired coupon'
            ], 400);
        }

        return response()->json([
            'message' => 'Valid coupon',
            'discount_percentage' => $coupon->discount_percentage
        ]);
    }

    public function redeem(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string'
        ]);

        $coupon = Coupon::where('code', $validated['code'])
            ->where('is_used', false)
            ->where('expiry_date', '>', now())
            ->first();

        if (!$coupon) {
            return response()->json([
                'message' => 'Invalid or expired coupon'
            ], 400);
        }

        $coupon->update(['is_used' => true]);

        return response()->json([
            'message' => 'Coupon redeemed successfully',
            'discount_percentage' => $coupon->discount_percentage
        ]);
    }
}
