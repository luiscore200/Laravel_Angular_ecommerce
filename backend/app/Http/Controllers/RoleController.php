<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{


    public function __construct(){
        $this->middleware('jwt.verify:api')->except([]);
        $this->middleware('can:admin')->except([]);
    }
    public function index(){

    

        $role=Role::all();
        return response()->json($role);
    }
}
