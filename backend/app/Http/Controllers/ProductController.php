<?php

namespace App\Http\Controllers;

use App\Models\category;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.verify:api')->except(['index','getInfo','show']);
        $this->middleware('can:admin')->except(['index','getInfo','show']);


        
    } //
    public function store(Request $request){

    

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'category'=>'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10000',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
      

       
     
        
        try{

            $filename="";
            if($request->hasFile('image')){
                $file=$request->file('image');
                $filename=time() . '_' . $file->getClientOriginalName();
                $file->storeAs('public/post', $filename);
            }else{
                $filename=null;
            }
    

            $category=category::where('name',$request->category)->first();
         //   return response()->json($category);
            if($category){
                $image= new product();
                $image->name=$request->name;
                $image->price=$request->price;
                $image->description=$request->description;
                $image->category_id=$category->id;
               
    
                $image->image = $filename;
                $result=$image->save();
                if($result){
                    return Response()->json(['success'=>true]);
                }else{
                    return Response()->json(['success'=>false]);
                }

            }    
            return Response()->json(['message'=>'category not found'],404);
         
        }catch(Exception $e){
            return Response()->json(['error'=>$e]);
        }
        
    }

    public function index(Request $request)
    {
        $products = Product::with('category')->get();

        if($request->category_id){
            $products = $products->where('category_id',$request->category_id);
        }
       
    
        if ($products->isEmpty()) {
            return response()->json(['msg' => 'Products not found'], 404);
        }
    
        $responseData = [];
    
        foreach ($products as $product) {
            $imageUrl = asset('storage/post/' . $product->image);
            $category = $product->category;
    
            $responseData[] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'url' => $imageUrl,
                'description' => $product->description,
                'category' => [
                    'id' => $category->id,
                    'name' => $category->name,
                    // Si necesitas más información de la categoría, agrégala aquí
                ]
            ];
        }
    
        return response()->json($responseData);
    }

    public function getInfo($id){
        $images= product::findOrFail($id);
        if($images){
            $imageUrl = asset('storage/post/' . $images->image);
            return Response()->json(['image'=>$images,'url'=>$imageUrl]);
        }else{

            return Response()->json(['msg'=>'image not found'],404);
        }
    
    }



    public function update(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'category' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        // 
       
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try{

        $images= product::findOrFail($id);

        if($images){

        if($request->hasFile('image')){
            File::delete(storage_path('app/public/post/' . $images->image));

            $file=$request->file('image');
            $filename=time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/post', $filename); 
            $images->image = $filename;
        }
        $category= category::where('name',$request->category)->first();
        if($category){
            $images->category_id=$category->id;
        }
        $images->name=$request->name;
        $images->price=$request->price;
       
        $images->description=$request->description;

        $result= $images->save();

        if($result){
            return Response()->json(['success'=>true]);
        }else{
            return Response()->json(['success'=>false]);
        }
      }

    }catch(Exception $e){
        return Response()->json($e);
    }
    }

    public function destroy($id){
        $product= product::findOrFail($id);
        if($product){
            File::delete(storage_path('app/public/post/' . $product->image)); 
            $result= $product->delete();
            if ($result) {
                // Si se eliminó el producto, eliminar la imagen asociada
                $imagePath = storage_path('app/public/post/' . $product->image);
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                }
                return Response()->json(['success'=>true]);
            }else{
                return Response()->json(['success'=>false]);
            }
        }else{
            return Response()->json(['msg'=>'not found'],404);
        }
      
    }

    public function show($id)
    {
        $image = Product::findOrFail($id);

        if ($image) {
            $path = storage_path('app/public/post/' . $image->image);

            // Verificar si la imagen existe en el almacenamiento
            if (File::exists($path)) {
                $file = File::get($path);
                $type = File::mimeType($path);

                // Retornar la vista de la imagen
                return Response::make($file, 200)->header("Content-Type", $type);
            } else {
                return Response()->json(['msg' => 'Imagen no encontrada'], 404);
            }
        } else {
            return Response()->json(['msg' => 'Registro no encontrado'], 404);
        }
    }
}
