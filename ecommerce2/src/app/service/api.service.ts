  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';

  import { Observable, catchError, map, of } from 'rxjs';
  import { User} from '../interface/user';

  import { TokenService } from './token.service';
  import { Router } from '@angular/router';
  import { AuthService } from './auth.service';
import { Product } from '../interface/product';
  @Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    url:string = 'http://127.0.0.1:8000/api'
  
    constructor(private http:HttpClient, private auth:AuthService, private token:TokenService,private router:Router) { }

    login(objeto:User):Observable<User>{
      return this.http.post<User>(this.url+'/auth/login', objeto).pipe(
        //mapeamos la respuesta, esta funcion contiene un parametro por defecto proveniente del back
        map((resp:any)=>{
          //testeamos si la respuesta tiene un token de acceso
          if(resp.access_token){
            //testeamos si el token de acceso es valido
          if(this.token.TokenVerify(resp.access_token)){
            //de ser valido lo guardamos y retornamos true;
            return this.auth.saveLocalStorage(resp);
          }else{
            //si el token de acceso no es valido retornamos al login
            this.router.navigate(["/auth/login"]);
          }
          }else {
            //si la respuesta no tiene token de acceso, retornamos la respuesta para mostrar el error
          return resp;
          }
        }),
        catchError((error:any)=>{
          return of(error);
        }),
        
        )
    }

    register(objeto:User):Observable<User>{
      return this.http.post<User>(this.url+'/auth/register', objeto).pipe( 
        //mapeamos la respuesta
        map((resp:any)=>{
        if(resp.message){
        return true;
        //el registro solo nos devolvera un error o un successfull, por lo cual solo retornaremos true en caso de no recibir error

        }else {
        return resp;
        //en caso de recibir error retornamos la respuesta del servidor para el manejo del error
        }
      }),
      catchError((error:any)=>{
        return of(error);
      }),
      
      )
    }


    getProduct(category_id?:any):Observable<any>{
      //category_id={category_id:2};
        return this.http.post<Product[]>(this.url+'/product/index',category_id).pipe(

          map((resp:any)=>{
            if(resp.message){
            return true;
            //el registro solo nos devolvera un error o un successfull, por lo cual solo retornaremos true en caso de no recibir error
      
            }else {
            return resp;
            //en caso de recibir error retornamos la respuesta del servidor para el manejo del error
            }
          }),
          catchError((error:any)=>{
            return of(error);
          }),
          
        );
    }


    getCategory():Observable<any>{
      //category_id={category_id:2};
        return this.http.get<any>(this.url+'/category/index').pipe(

          map((resp:any)=>{
            if(resp.message){
            return true;
            //el registro solo nos devolvera un error o un successfull, por lo cual solo retornaremos true en caso de no recibir error
      
            }else {
            return resp;
            //en caso de recibir error retornamos la respuesta del servidor para el manejo del error
            }
          }),
          catchError((error:any)=>{
            return of(error);
          }),
          
        );
    }

    preference(objeto:any):Observable<any>{
      return this.http.post<any>(this.url+'/checkout/preference', objeto).pipe(
        map((resp:any)=>{
          if(resp.message){
          return true;
          //el registro solo nos devolvera un error o un successfull, por lo cual solo retornaremos true en caso de no recibir error
    
          }else {
          return resp;
          //en caso de recibir error retornamos la respuesta del servidor para el manejo del error
          }
        }),
        catchError((error:any)=>{
          return of(error);
        }),
      );
  
      
     }

    findPreference(objeto:any):Observable<any>{
      return this.http.get<any>(this.url+'/checkout/findPreference/'+objeto).pipe(
        map((resp:any)=>{
          if(resp.message){
          return true;
          //el registro solo nos devolvera un error o un successfull, por lo cual solo retornaremos true en caso de no recibir error
    
          }else {
          return resp;
          //en caso de recibir error retornamos la respuesta del servidor para el manejo del error
          }
        }),
        catchError((error:any)=>{
          return of(error);
        }),
      );
  
      
     }
     findPayment(objeto:any):Observable<any>{
      return this.http.get<any>(this.url+'/checkout/findPayment/'+objeto).pipe(
        map((resp:any)=>{
          if(resp.message){
          return true;
          //el registro solo nos devolvera un error o un successfull, por lo cual solo retornaremos true en caso de no recibir error
    
          }else {
          return resp;
          //en caso de recibir error retornamos la respuesta del servidor para el manejo del error
          }
        }),
        catchError((error:any)=>{
          return of(error);
        }),
      );
  
      
     }

 
  }
