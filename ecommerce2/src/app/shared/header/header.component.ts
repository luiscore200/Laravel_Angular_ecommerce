import { Component,  HostListener} from '@angular/core';
import { Drawer, Modal } from 'flowbite';


import { AuthService } from '../../service/auth.service';
import { SearchService } from '../../service/search.service';
import { ApiService } from '../../service/api.service';
import { CartComponent } from '../cart/cart.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchInput:string="";
  loged:boolean=false;
  category:any;
  categoryInput:number=-1;
  toggleCart:boolean=false;
  

  constructor(private auth:AuthService,private search:SearchService,private api:ApiService){
    this.loged=this.auth.isAuthenticated();
    console.log(this.loged);
  }

  
  ngOnInit(): void {
   
 
     this.api.getCategory().subscribe(
       data=> this.category=data,
     )
 //     console.log(this.category)
   }

 categoryFilter(id?:number):void{
//  console.log(id);
  if(id){
    this.categoryInput=id;
  }else{
    this.categoryInput=-1;
  }
  this.openDropdown();
  this.search.setCategoryQuery(this.categoryInput);

 }

  Search(): void {

    this.search.setSearchQuery(this.searchInput);
  }


openMenu(event:Event):void{

  var  menu=document.getElementById("menu");
  var  search= document.getElementById("search");
  var  userMenu=document.getElementById("userMenu");
  var categories=document.getElementById("categories_dropdown");
  var cart=document.getElementById("cart");
  var cart_2=document.getElementById("cart-mobile");


  if(menu){
    if(menu.classList.contains("hidden")){

   
    menu.classList.toggle("hidden");

    if(!search?.classList.contains("hidden")){
      search?.classList.add("hidden");
    }
    if(!userMenu?.classList.contains("hidden")){
      userMenu?.classList.add("hidden");
    }
    if(!categories?.classList.contains("hidden")){
      categories?.classList.add("hidden");
    }
    if(!cart?.classList.contains("translate-y-full")){
      cart?.classList.add("translate-y-full");
      cart?.classList.remove("top-0");
    }
         if(!cart_2?.classList.contains("hidden")){
        cart_2?.classList.add("hidden");
      }


   }else{
    menu.classList.add("hidden");
  }
  }
 
}
openSearch(event:Event):void{
  var  menu=document.getElementById("menu");
var  search= document.getElementById("search");
var  userMenu=document.getElementById("userMenu");
var categories=document.getElementById("categories_dropdown");
var cart=document.getElementById("cart");
var cart_2=document.getElementById("cart-mobile");


  if(search){
    
    if(search.classList.contains("hidden")){
    
     search.classList.remove("hidden");

      if(!menu?.classList.contains("hidden")){
        menu?.classList.add("hidden");
      }
      if(!userMenu?.classList.contains("hidden")){
        userMenu?.classList.add("hidden");
      }
      if(!categories?.classList.contains("hidden")){
        categories?.classList.add("hidden");
      }
      if(!cart?.classList.contains("translate-y-full")){
        cart?.classList.add("translate-y-full");
        cart?.classList.remove("top-0");
      }
      if(!cart_2?.classList.contains("hidden")){
        cart_2?.classList.add("hidden");
      }

     
    }else{
      search.classList.add("hidden");
      if(!cart_2?.classList.contains("hidden")){
        cart_2?.classList.add("hidden");
      }

    }
  }
 
}

openMenuUser(event:Event):void{
  var  menu=document.getElementById("menu");
  var  search= document.getElementById("search");
  var  userMenu=document.getElementById("userMenu");
  var categories=document.getElementById("categories_dropdown");
  var cart=document.getElementById("cart");
  var cart_2=document.getElementById("cart-mobile");
  
  

  if(userMenu){
    console.log(userMenu.classList);
       
    if(userMenu.classList.contains("hidden")){
       userMenu.classList.remove("hidden");

       if(!menu?.classList.contains("hidden")){
        menu?.classList.add("hidden");
      }
      if(!search?.classList.contains("hidden")){
       search?.classList.add("hidden");
      }
      if(!categories?.classList.contains("hidden")){
        categories?.classList.add("hidden");
      }
      if(!cart?.classList.contains("translate-y-full")){
        cart?.classList.add("translate-y-full");
        cart?.classList.remove("top-0");
      }
      if(!cart_2?.classList.contains("hidden")){
        cart_2?.classList.add("hidden");
      }

    }else{
      userMenu.classList.add("hidden");

     
     
     
    }
    
  }
}

openDropdown(event?:Event):void{

  var categories=document.getElementById("categories_dropdown");
  
  console.log(categories);

  if(categories){
    if(categories.classList.contains("hidden")){

   
      categories.classList.remove("hidden");

   
   }else{
    categories.classList.add("hidden");
  }
  }
 
}

openCart(event:Event):void{
  var  menu=document.getElementById("menu");
  var  search= document.getElementById("search");
  var  userMenu=document.getElementById("userMenu");
  var categories=document.getElementById("categories_dropdown");
  var cart=document.getElementById("cart");
  var cart_2=document.getElementById("cart-mobile");
  var categories=document.getElementById("categories_dropdown");
  
    if(cart){
      if(cart.classList.contains("translate-y-full")){
        cart.classList.add("top-0");
        cart.classList.remove("translate-y-full");

        if(!menu?.classList.contains("hidden")){
          menu?.classList.add("hidden");
        }
        if(!search?.classList.contains("hidden")){
         search?.classList.add("hidden");
        }
        if(!categories?.classList.contains("hidden")){
          categories?.classList.add("hidden");
        }
        if(!userMenu?.classList.contains("hidden")){
          userMenu?.classList.add("hidden");
        }
       
        if(!cart_2?.classList.contains("hidden")){
          cart_2?.classList.add("hidden");
        }
        
       
     
    
      
      }else{
      
      
        cart.classList.add("translate-y-full");
         cart.classList.remove("top-0");
        
     
      }
    }
    console.log(cart);


}

openCartMobile(event?:Event):void{

  var cart_2=document.getElementById("cart-mobile");
  var  menu=document.getElementById("menu");
  var  search= document.getElementById("search");
  var  userMenu=document.getElementById("userMenu");
  var categories=document.getElementById("categories_dropdown");
  var cart=document.getElementById("cart");
 
  var categories=document.getElementById("categories_dropdown");
  
  console.log(cart_2);

  if(cart_2){
    if(cart_2.classList.contains("hidden")){

   
      cart_2.classList.remove("hidden");

      if(!menu?.classList.contains("hidden")){
        menu?.classList.add("hidden");
      }
      if(!userMenu?.classList.contains("hidden")){
        userMenu?.classList.add("hidden");
      }
      if(!categories?.classList.contains("hidden")){
        categories?.classList.add("hidden");
      }
      if(!cart?.classList.contains("translate-y-full")){
        cart?.classList.add("translate-y-full");
        cart?.classList.remove("top-0");
      }
   

   
   }else{
    cart_2.classList.add("hidden");
  }
  }
 
}


logOut():void{
  this.auth.logout();
}





}