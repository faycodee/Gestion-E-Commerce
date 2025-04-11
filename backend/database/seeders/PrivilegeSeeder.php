<?php

namespace Database\Seeders;

use App\Models\Privilege;
use Illuminate\Database\Seeder;

class PrivilegeSeeder extends Seeder
{
    public function run(): void
    {
        $privileges = [
            ['nom' => 'Client Standard'],
            ['nom' => 'Client Premium'],
            ['nom' => 'Client VIP'],
        ];

        foreach ($privileges as $privilege) {
            Privilege::create($privilege);
        }
    }
}