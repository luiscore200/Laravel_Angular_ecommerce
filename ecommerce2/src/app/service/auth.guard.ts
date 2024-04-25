import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from './auth.service';
import { Routetype } from '../interface/routetype';


@Injectable({
    providedIn: 'root'
})
export class authGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService,private router:Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.verify(next);
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }

    async verify(route:any) {
        const isAuthenticated = this.authService.isAuthenticated();
    const routeType = route.data['type'] as Routetype;
        if (isAuthenticated) {
            
            // Usuario autenticado
            if (routeType === Routetype.Public || routeType === Routetype.LoggedIn) {
              // Permitir acceso a rutas públicas o de tipo "LoggedIn"
              return true;
            } else {
              // Redirigir al inicio si se intenta acceder a una ruta de tipo "LoggedOut" mientras está autenticado
              this.router.navigate(['/']);
             
              return false;
            }
          }else {
            // Usuario no autenticado
            if (routeType === Routetype.Public || routeType === Routetype.LoggedOut) {
              // Permitir acceso a rutas públicas o de tipo "LoggedOut"
              return true;
            } else {
              // Redirigir al login si se intenta acceder a una ruta protegida mientras está no autenticado
              this.router.navigate(['/login']);
              return false;
            }
          }
      
        }
  }
    