<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MPcontroller;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Contracts\Role;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'
], function ($router) {
    Route::post('register',[AuthController::class,'register']);
    Route::post('login',[AuthController::class,'login']);
    Route::get('show',[AuthController::class,'getaccount']);
    Route::get('refresh',[AuthController::class,'refresh']);
    Route::get('logout',[AuthController::class,'logout']);  
});

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'user'
],function($router){
    Route::get('index',[UserController::class,'index']);
    Route::post('store',[UserController::class,'store']);
    Route::post('update/{id}',[UserController::class,'update']);
    Route::delete('delete/{id}',[UserController::class,'destroy']);
});

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'product'
],function($router){
    Route::post('index',[ProductController::class,'index']);
    Route::get('getInfo/{id}',[ProductController::class,'getInfo']);
    Route::get('show/{id}',[ProductController::class,'show']);
    Route::post('store',[ProductController::class,'store']);
    Route::put('update/{id}',[ProductController::class,'update']);
    Route::delete('delete/{id}',[ProductController::class,'destroy']);
});

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'role'
],function($router){
    Route::get('index',[RoleController::class,'index']);
});


Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'category'
],function($router){
    Route::get('index',[CategoryController::class,'index']);
});

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'checkout'
],function($router){
  
    Route::post('pse',[MPcontroller::class,'PSE']);
    Route::post('card',[MPcontroller::class,'card']);
    Route::post('preference',[MPcontroller::class,'preference']);
    Route::get('findPayment/{id}',[MPcontroller::class,'findPayment']);
    Route::get('findPreference/{id}',[MPcontroller::class,'findPreference']);
    Route::post('catchHooks',[MPcontroller::class,'catchHooks']);
    
    
    


});


