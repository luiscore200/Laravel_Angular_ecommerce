import { Component } from '@angular/core';
import { Product } from '../../interface/product';
import { CartService } from '../../service/cart.service';
import { ObjCart } from '../../interface/obj-cart';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { stringify } from 'querystring';
import { CheckoutService } from '../../service/checkout.service';

@Component({
  selector: 'app-cart',
 
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
products:ObjCart[]=[];
total:number=0;



constructor(private cart:CartService, private router:Router, private api:ApiService, private checkout:CheckoutService){}

ngOnInit(): void {
 this.cart.getProducts().subscribe(
  data => {
   this.handleData(data);
  }
 )
  
}

handleData(data:any):void{
  console.log(data);
  this.products=data;
  this.subTotal();
}

onDelete(id:number){
this.cart.deleteAll(id);
}



subTotal():void{

this.total=0;

this.products.forEach(product => {
  if (product.selected) {
    this.total += product.count * product.product.price;
  //  console.log(this.total);
  }
});

this.cart.updateCart(this.products);

}

close():void{
  var cart=document.getElementById("cart");
    if(cart){
    
      
        cart.classList.add("translate-y-full");
         cart.classList.remove("top-0");
        
     
      
    }
    console.log(cart);

}

closeMobile():void{
  var cart=document.getElementById("cart-mobile");
    if(cart){
    
      
        cart.classList.add("hidden");
        
        
     
      
    }
    console.log(cart);

}

openCheckout():void{

  /*
  this.cart.getProducts().subscribe(
    data => {
     this.handleData(data);
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
    "amount":this.total.toString(),
    "items":obj,
  }
  

       console.log(obj2);
       this.api.preference(obj2).subscribe(
        data=> this.handleResponsePreference(data),
       )
       */

  this.router.navigate(['/payment/checkout']);

}
/*
handleResponsePreference(data:any){
  console.log(data);
  
}
*/

}
