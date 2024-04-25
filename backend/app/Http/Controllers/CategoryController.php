<?php

namespace App\Http\Controllers;

use App\Models\category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    

    public function __construct(){
        $this->middleware('jwt.verify:api')->except(['index']);
        $this->middleware('can:admin')->except(['index']);
    }
    public function index(){

    

      $category=category::All();
        return response()->json($category);
    }
}
