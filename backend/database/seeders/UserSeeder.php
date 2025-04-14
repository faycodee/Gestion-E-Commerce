<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'id' => 1,
                'first_name' => 'John',
                'name' => 'User 1',
                'email' => 'user1@example.com',
                'password' => bcrypt('password1'),
                'role' => 'user', // Add role
            ],
            [
                'id' => 2,
                'first_name' => 'Jane',
                'name' => 'User 2',
                'email' => 'user2@example.com',
                'password' => bcrypt('password2'),
                'role' => 'user', // Add role
            ],
            [
                'id' => 3,
                'first_name' => 'Alice',
                'name' => 'User 3',
                'email' => 'user3@example.com',
                'password' => bcrypt('password3'),
                'role' => 'admin', // Add role
            ],
        ]);
    }
}