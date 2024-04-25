import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { Routetype } from '../../interface/routetype';
import { authGuard } from '../../service/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{
  path:'',
  component:AuthComponent,
  data: { type: Routetype.LoggedOut },
  canActivate: [authGuard],
  children:[{
   path:'login',
   component:LoginComponent,
   data: { type: Routetype.LoggedOut },
  },
  {
   path:'register',
   component:RegisterComponent,
   data: { type: Routetype.LoggedOut },
  }]
 
 
 }];
 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
