import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [{
  path:'',
  component:PaymentComponent,
  
  children:[{
   path:'checkout',
   component:CheckoutComponent,
  
  },{
    path:'status',
    component:StatusComponent,
   
   },
  ]
 
 
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
