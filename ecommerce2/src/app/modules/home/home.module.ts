import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { SearchService } from '../../service/search.service';
import { CartService } from '../../service/cart.service';





@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
 
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule
  ], 
  exports: [
    ProductComponent,
    
  ],  providers: [
    ApiService,
    SearchService,
    CartService
  ]
})
export class HomeModule { }
