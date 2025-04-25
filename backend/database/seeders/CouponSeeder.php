<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Coupon;
use Carbon\Carbon;

class CouponSeeder extends Seeder
{
    public function run()
    {
        $coupons = [
            [
                'code' => 'WELCOME10',
                'discount_percentage' => 10,
                'is_used' => false,
                'expiry_date' => Carbon::now()->addDays(30),
            ],
            [
                'code' => 'SPRING20',
                'discount_percentage' => 20,
                'is_used' => false,
                'expiry_date' => Carbon::now()->addDays(60),
            ],
            [
                'code' => 'SUMMER15',
                'discount_percentage' => 15,
                'is_used' => false,
                'expiry_date' => Carbon::now()->addDays(45),
            ],
            [
                'code' => 'WINTER25',
                'discount_percentage' => 25,
                'is_used' => true,
                'expiry_date' => Carbon::now()->addDays(15),
            ],
        ];

        foreach ($coupons as $coupon) {
            Coupon::create($coupon);
        }
    }
}
