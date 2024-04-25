import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Product } from '../../../interface/product';
import { SearchService } from '../../../service/search.service';
import { CartService } from '../../../service/cart.service';



@Component({
  selector: 'app-product',

  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  object!:Product[];
  object2!:Product[];
  object3!:Product[];
  category:any;
  category_filter:number=-1;
  search:string="";


  constructor(private api:ApiService,private src:SearchService, private cart:CartService){
 
  }



  ngOnInit(): void {
   this.src.searchQuery$.subscribe(
    data=>{

    this.handleSearch(data);
    
    }

    
  
   )
  
    this.api.getProduct().subscribe(
      data=>this.handleData(data),
    )

    this.api.getCategory().subscribe(
      data=> this.category=data,
    )

    this.src.categoryQuery$.subscribe(
      data=>{
  
      this.handleCategory(data);
      
      })
      //console.log(this.category)
  }


  handleData(data:any):void{
    this.object=data;
    this.object2=this.object;
    this.filter();
console.log(data);

  }

  handleCategory(data:number):void{
    this.category_filter=data;
    this.filter();

  }



  handleSearch(data:any){
    console.log(data);
    this.search=data;
    console.log(this.search);
    this.filterSearch(this.search);

  }


  filterSearch(data?:string):void{

    if(data!=""){
      this.object2=this.object.filter(n=> n.name.toUpperCase().includes(this.search.toUpperCase()))
      this.filter();
    }else{
      this.object2=this.object;
      this.filter();
    }
  }


  categoryFilter(id?:number){
    console.log(id)
    if(id){
      this.category_filter=id;
    }else{
      this.category_filter=-1;
    }

    this.filter();

  }


  filter(){
    /*
    const obj={category_id:id};
    this.api.getProduct(obj).subscribe(
      data=>this.handleData(data),
    )
     console.log(obj);
  */
 if(this.category_filter!=-1){
 
  this.object3=this.object2.filter(product => product.category.id==this.category_filter);
  console.log(this.object3)

 }else{
  this.object3=this.object2;
 }
    
}

addCart(product:Product){

  this.cart.add(product);
  
}

buy(product:Product){
  this.cart.deselectedAll();
 this.cart.add(product);
  
  
  var cart = document.getElementById("cart")

   
  if(cart){
    if(cart.classList.contains("translate-y-full")){
      cart.classList.add("top-0");
      cart.classList.remove("translate-y-full");}}
}



}
