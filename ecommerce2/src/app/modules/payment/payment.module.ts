import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from '../../shared/shared.module';
import { PaymentComponent } from './payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusComponent } from './status/status.component';


@NgModule({
  declarations: [CheckoutComponent,PaymentComponent,StatusComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
