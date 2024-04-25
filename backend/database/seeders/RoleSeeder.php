<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin= Role::create(["name" => "admin"]);
        $user = Role::create(["name" => "user"]);

        Permission::create(['name'=>'admin'])->syncRoles([$admin]);
        Permission::create(['name'=>'admin.user'])->syncRoles([$admin,$user]);
        Permission::create(['name'=>'user'])->syncRoles([$user]);
    }
}
