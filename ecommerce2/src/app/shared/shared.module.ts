import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from '../service/search.service';
import { ApiService } from '../service/api.service';
import { CartComponent } from './cart/cart.component';
import { CartService } from '../service/cart.service';







@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartComponent
   
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  
    
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CartComponent
    
   
  ],providers:[
    SearchService,
    ApiService,
    CartService
  ]
})
export class SharedModule { }
