<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    
    public function __construct()
    {
        $this->middleware('jwt.verify:api');
        $this->middleware('can:admin');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {    
        try{
            $users = User::all();
            $result = [];
        
            foreach ($users as $user) {
            
             $role = $user->getRoleNames();
        
           
                $userData = [
                    'user' => $user,
                    'role' => $role
                ];
        
                $result[] = $userData;
            }
        
            return response()->json($result);
        }catch(Exception $e){
            return response()->json($e);
        }
        
    }

   
    public function store(Request $request)
    {
    
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:40',
            'email'=>'required|unique:users|max:255|email',
            'password' =>'required|min:6|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        try{
            $existing = User::where('email', $request->email)->first();
  
            if ($existing) {
                return response()->json(['error' => 'the email has already been taken'], 422);
            }else{
    
                $user = User::create([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'password'=>$request->password
                ]);
  
                $role = Role::where('name',$request->role)->first();
                if($role){
                    $user->assignRole($role);
                }
  
               // $token = JWTAuth::fromUser($user);
              //  return response()->json(['user'=>$user, 'token'=>$token],201);
              return response()->json(['message' => 'Success'],201);
            }
           

        }catch(Exception $e){
            return response()->json($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $user=User::findOrFail($id);
            if($user){
                $user->name=$request->name;
                $user->update();
                $role = Role::where('name',$request->role)->first();
                if($role){
                    $user->roles()->detach();
                    $user->assignRole($role);
                    return Response()->Json(["message"=>"success, user has updated"],200);

                }
                return response()->json(["message"=>"object '".$request->role."' not found"],404);
            }

        }catch(Exception $e){
            return Response()->Json($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $user=User::findOrFail($id);
            if($user){
            $user->delete();
                return Response()->Json(["message"=>"success, user has deleted"],200);
            }else{
                return response()->json(["message"=>"user not found"],404);
            }
        }catch(Exception $e){
            return Response()->Json($e);
        }
        
    }
}
