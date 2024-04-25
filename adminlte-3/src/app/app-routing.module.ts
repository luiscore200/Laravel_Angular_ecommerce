import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { RouteType } from './utils/RouteType';
import { UserListComponent } from '@pages/user-list/user-list.component';
import { ProductListComponent } from '@pages/productList/product-list.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { type: RouteType.LoggedIn },
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
                data: { type: RouteType.LoggedIn },

               
            },
            {
                path: 'blank',
                component: BlankComponent,
                data: { type: RouteType.LoggedIn },
             
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent,
                data: { type: RouteType.LoggedIn },
             
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent,
                data: { type: RouteType.LoggedIn },
                
            },
            {
                path: 'users',
                component: UserListComponent,
                data: { type: RouteType.LoggedIn },
            },
            {
                path: 'products',
                component: ProductListComponent,
                data: { type: RouteType.LoggedIn },
            },
            {
                path: '',
                component: DashboardComponent,
                data: { type: RouteType.LoggedIn },
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard],
        data: { type: RouteType.LoggedOut },
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
        data: { type: RouteType.LoggedOut },
    
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [AuthGuard],
        data: { type: RouteType.LoggedOut },
      
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [AuthGuard],
        data: { type: RouteType.LoggedOut },
       
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
