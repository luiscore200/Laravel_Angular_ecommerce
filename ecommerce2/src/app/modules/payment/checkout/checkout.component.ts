import { Component, NgZone } from '@angular/core';
import { CheckoutService } from '../../../service/checkout.service';
import { ApiService } from '../../../service/api.service';
import { CartService } from '../../../service/cart.service';
import { ObjCart } from '../../../interface/obj-cart';
import {  Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const MPStatus:any;
declare const alerta:any;
declare const mercadoPago:any;

@Component({
  selector: 'app-checkout',

  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  form:FormGroup;
  nameControl:any;
  lastNameControl:any;
  emailControl:any;
  phoneControl:any;
  addressControl:any;
  cityControl:any;
  stateControl:any;
  zipControl:any;
  error:any;

  products:ObjCart[]=[];

  
  constructor(private api:ApiService, private cart:CartService, private fb:FormBuilder){
    this.form = this.fb.group({
    
      name:['',[Validators.required]],
      lastName:['',[]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern('^[0-9]*$')]],
      address:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      zip:['',[]],


    });
  }


ngOnInit(): void {
  
  this.cart.getProducts().subscribe(
    data => {
    this.handleSummary(data); 
    }
   )
}





ngDoCheck(): void {
  this.nameControl= this.form.get('name');
  this.lastNameControl= this.form.get('lastName');
  this.emailControl=this.form.get('email');
  this.phoneControl= this.form.get('phone');
  this.addressControl= this.form.get('address');
  this.cityControl= this.form.get('city');
  this.stateControl= this.form.get('state');
  this.zipControl= this.form.get('zip');
}





handleSummary(data:ObjCart[]):void{

    data.forEach(product => {
    if (product.selected) {
        this.products.push(product);
  
    }

})
}


subTotal():Number{

  var total=0;
  
  this.products.forEach(product => {
    if (product.selected) {
      total += product.count * product.product.price;
    //  console.log(this.total);
    }
  });
  
  return total;
  
  }


  onSubmit():void{
    console.log("hola");

    const payer = this.form.value;
//  -----------------------------

    this.cart.getProducts().subscribe(
      data => {
        this.products=data;
      }
     )
     
     const obj:any = [
    ];
  
    this.products.forEach(product => {
     if (product.selected) {
       obj.push({
         "id":product.product.id,
         "tittle":product.product.name,
         "description":product.product.description,
         "picture_url":product.product.url,
         "quantity":product.count,
         "currency_id":"COP",
         "unit_price":Number(product.product.price),
       });
   
     }
   });
  
   const obj2={
    "amount":this.subTotal().toString(),
    "items":obj,
    "payer":payer,
  }
  
   console.log(obj2);
   this.api.preference(obj2).subscribe(
    data=>this.handlePreference(data),
   )

   
  
   
  }
  handlePreference(data:any){
    console.log(data);
    console.log(data.sandbox_init_point);
    window.open(data.sandbox_init_point, '_blank');
  }


  /*
 

  idPreference:String="";

  constructor(private service:CheckoutService,private api:ApiService, private cart:CartService,private router:Router){}
  

 ngOnInit(): void {

    this.test();
    this.service.exposeSendResponse();
    this.service.exposeSendResponse2();

   // subcripcion a response pse
   this.service.response$.subscribe(
      (response: any) => {
        response = this.handleResponse(response);
        // tratamiento response pse
      }
    );

       // subcripcion a response card
   this.service.response2$.subscribe(
    (response: any) => {
       // tratamiento response card
      response = this.handleResponse2(response);
   
    }
  );
  
 }




test(){
  
  this.cart.getProducts().subscribe(
    data => {
      this.products=data;
    }
   )
   


   

   const obj:any = [
  ];

  this.products.forEach(product => {
   if (product.selected) {
     obj.push({
       "id":product.product.id,
       "tittle":product.product.name,
       "description":product.product.description,
       "picture_url":product.product.url,
       "quantity":product.count,
       "currency_id":"COP",
       "unit_price":Number(product.product.price),
     });
 
   }
 });

 const obj2={
  "amount":this.subTotal().toString(),
  "items":obj,
}

 console.log(obj2);
 this.api.preference(obj2).subscribe(
  data=> this.handleResponsePreference(data),
 )

  
}

subTotal():Number{

  var total=0;
  
  this.products.forEach(product => {
    if (product.selected) {
      total += product.count * product.product.price;
    //  console.log(this.total);
    }
  });
  
  return total;
  
  }

  handleResponsePreference(data:any){
    console.log(data);
    this.idPreference= data.id;
    this.MercadoPago(data);
   
  }
 

 handleResponse(data:any){
  console.log(data);
  var  menu=document.getElementById("paymentBrick_container");
  
  if(menu){
    if(!menu.classList.contains("hidden")){
      menu.classList.add("hidden");
    }
  }
  if (typeof MPStatus === 'function') {
    MPStatus(data);
   } else {
     console.error("La función 'MPStatus' no está definida o el script no se ha cargado correctamente.");
   }

 }

 handleResponse2(data:any){

  var  menu=document.getElementById("paymentBrick_container");
  
  if(menu){
    if(!menu.classList.contains("hidden")){
      menu.classList.add("hidden");
    }
  }
  
  console.log(data);
  if (typeof MPStatus === 'function') {
    MPStatus(data);
   } else {
     console.error("La función 'MPStatus' no está definida o el script no se ha cargado correctamente.");
   }

   if(data.status =="approved"){
    this.cart.reset();
   }
  
}

 MercadoPago(data:any):void{
  if (typeof mercadoPago === 'function') {
   mercadoPago(data);
  } else {
    console.error("La función 'mercado pago' no está definida o el script no se ha cargado correctamente.");
  }
}


*/
openTest(){
  window.open('https://www.mercadopago.com.co/developers/es/docs/your-integrations/test/cards', '_blank');
}

}
