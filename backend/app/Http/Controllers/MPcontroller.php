<?php

namespace App\Http\Controllers;

use App\Models\preference;
use App\Models\transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Str;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Client\Preference\PreferenceClient;

use MercadoPago\MercadoPagoConfig;


use MercadoPago\Client\Common\RequestOptions;



class MPcontroller extends Controller
{

  public function __construct()
  {
 
   
  }

      public function preference(Request $request){
        MercadoPagoConfig::setAccessToken(env('MP_KEY'));
        $client = new PreferenceClient();

        $external_reference =date('Ymd').'.'.time().'.'.Str::random(6);

        $additional_info = ["amount"=>$request["amount"],"payer_ip"=>$request->ip(),];

       $payer=[  
          "name"=>$request["payer"]["name"],
          "surname"=>$request["payer"]["lastName"],
          "email"=>$request["payer"]["email"],
  /*          "identification"=>[
          "type"=>"",
          "number"=>"",
        ],*/
        "phone"=>[
          "area_code"=>"57",
          "number"=>$request["payer"]["phone"],
        ], // location es enviado a mercado pago, pero no leido, ya que su api no reconoce este parametro
        //location esta aqui solo para ser enviado a las preferencias locales, si el cliente paga, se necesitaran estos datos....
        "location"=>[
          "state"=>$request["payer"]["state"],
          "city"=>$request["payer"]["city"],
          "address"=>$request["payer"]["address"],
          "zip_code"=>$request["payer"]["zip"],
        ]
        ]; 

          $data= [
            "items" => $request["items"],
            
            "payer"=>$payer,

            "notification_url"=>"https://webhook.site/84ea22fc-8fe6-48f8-b958-cf7b467e8f11", //toca esperar a subir el back para poder configurar las rutas

              "additional_info"=>$additional_info,

            "back_urls"=>[
            "success"=>"http://localhost:4200/payment/status",
            "pending"=>"http://localhost:4200/payment/status",
            "failure"=>"http://localhost:4200/payment/status"
          ],
            "external_reference"=> $external_reference,
            ];


            //aqui atrapamos los items, los procesamos y reducimos para ahorrar espacio en la base de datos
            $shortenedItems = [];
            foreach ($request['items'] as $item) {
             
                $shortenedItem = [
                    "id" => $item['id'],
                    "title" => $item['tittle'],
                    "quantity" => $item['quantity'],
                    "unit_price" => $item['unit_price'],
                ];
                $shortenedItems[] = $shortenedItem;
            } 

            try{
              //creando preferencia local
              $ticket =preference::create([
                "external_reference"=>$external_reference,
                "items"=>json_encode($shortenedItems),
                "payer"=>json_encode($payer),
                "amount"=>$request["amount"],
              ]);

            //return $ticket2;
            }catch(Exception $e){

              return $e;

            }
        //  return response()->json($data);
        $preference = $client->create($data);
        $preference2 = json_encode($preference);
        
      
      return $preference2;
      
      }

      ////////////////////////////////////////////////////////////////////////////////////////// 

      
public function card(Request $request){
    MercadoPagoConfig::setAccessToken(env('MP_KEY'));
    $request_options = new RequestOptions();
   $request_options->setCustomHeaders(["X-Idempotency-Key:"]);
    $client = new PaymentClient();
  
  
    $data = [
    
      'transaction_amount' => $request["transaction_amount"],
      'token' => $request["token"],
    
      'installments' => $request["installments"],
      'payment_method_id' => $request["payment_method_id"],
      'issuer_id' => $request["issuer_id"], // Supongo que aquí estás accediendo directamente al ID del emisor
      'payer' => [
          'email' => $request["payer"]["email"],
          'identification' => [
              'number' => $request["payer"]["identification"]["number"],
              'type' => $request["payer"]["identification"]["type"],
          ]
          ],      "notification_url" => "https://webhook.site/84ea22fc-8fe6-48f8-b958-cf7b467e8f11", 
  ];

    $payment = $client->create($data,
    $request_options
  );
      return response()->json($payment);
  }
  

  
    

public function PSE(Request $request){
  MercadoPagoConfig::setAccessToken(env('MP_KEY'));
    $client = new PaymentClient();
    $request_options = new RequestOptions();
    $request_options->setCustomHeaders(["X-Idempotency-Key:". uniqid()]);

    $data =[
        "transaction_amount" => $request["transaction_amount"],
        "payer"=>[
        "email" => $request["payer"]["email"],
        "identification" => [
             "type" => $request["payer"]["identification"]["type"], //required
             "number" => $request["payer"]["identification"]["number"],  //required
        ],
        "entity_type" =>$request["payer"]["entity_type"],
      ],
        "additional_info" => [
          "ip_address" => "127.0.0.1" 
        ],//
        
        "callback_url" => "https://webhook.site/84ea22fc-8fe6-48f8-b958-cf7b467e8f11", //
        "notification_url" => "https://webhook.site/84ea22fc-8fe6-48f8-b958-cf7b467e8f11", 
        "payment_method_id" => $request["payment_method_id"],
        "transaction_details" => [
          "financial_institution" => $request["transaction_details"]["financial_institution"],  //required
        ],
        
      ];

      $payment = $client->create($data,
      $request_options
  );
  
    return response()->json($payment);
    }


////////////////////////////////////////////////////////////////////////////////////////
  
public function findPreference($id){
    MercadoPagoConfig::setAccessToken(env('MP_KEY'));
    $client = new PreferenceClient();
    $preference = $client->get($id);
    $preference2= json_encode($preference);
    return $preference2;
  }



  public function findPayment($id){
    MercadoPagoConfig::setAccessToken(env('MP_KEY'));
  $client = new PaymentClient();
  $payment = $client->get($id);
    $jsonList = json_encode($payment);
    return $jsonList;
  }
  
  



//////////////////////////////////////////////////////////////////////////////////////////

public function catchHooks(Request $request){

  if($request["action"]==="payment.updated"){
    $payment=  $this->findPayment($request["data"]["id"]);

    $payment2= json_decode($payment);
   // return $payment2->status;
      if($payment2->status==="approved"){

        $preference=preference::where("external_reference",$payment2->external_reference)->first();
//aprovecharemos la poca frecuencia de las solicitudes de compra para eliminar las preferencias viejas
            $this->cleanPreferences();

  // return $preference->items;
      $transaction=  transaction::create([
          "payment_id"=>$request["data"]["id"],
          "external_reference"=>$payment2->external_reference,
          "items"=>$preference->items,
          "payer"=>$preference->payer,
          "amount"=>$preference->amount,
        ]);
      }
      }
}


////////////////////////////////////////////////////////////////////////////////////////////////

public function cleanPreferences(){
  $cutoffDate = Carbon::now()->subDays(30);
  //preference::where('created_at', '<=', now()->subDays(30))->delete();
  $preferences=preference::where('created_at', '<=', $cutoffDate)->get();
  
  foreach ($preferences as $preference) {
   $preference->delete();
  }
}


}