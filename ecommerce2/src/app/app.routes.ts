import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule)
        
      },{
        path:'auth',
        loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
        
      },{
      path:'payment',
      loadChildren: () => import("./modules/payment/payment.module").then(m => m.PaymentModule)
      
    },
      {
        path:'',
        redirectTo: '/',
        pathMatch:'full',
      },{
        path:'**',
        redirectTo: 'error/404',
      
      }
];
