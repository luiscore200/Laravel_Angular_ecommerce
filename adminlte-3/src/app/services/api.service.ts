import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError, map, of} from 'rxjs';
import { User } from '@/interface/user';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';



@Injectable({
    providedIn: 'root'
})
export class ApiService {

  access_token:any;
  url:string = 'http://127.0.0.1:8000/api';

  
  

  constructor(private http:HttpClient, private auth:AuthService, private token:TokenService,private router:Router) {
    
//armamos el header para solicitar rutas que requieran autentificacion
   this.access_token = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.getToken() 
      })
    };

  }


  ///////////////////////////////////////////////////////// AUTH
  
  login(objeto:User):Observable<User>{
    return this.http.post<User>(this.url+'/auth/login', objeto).pipe(
      map((resp:any)=>{
        if(resp.access_token && resp.role=='admin'){
        if(this.token.TokenVerify(resp.access_token)){
          return this.auth.saveLocalStorage(resp);
        }else{
          
          this.router.navigate(["/auth/login"]);
        }
       
        return resp;

        }else {
          
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
      map((resp:any)=>{
      if(resp.message){
      return true;
     

      }else {
      return resp;
      }
    }),
    catchError((error:any)=>{
      return of(error);
    }),
    
    )
  }
///////////////////////////////////////////////////////// CLASIFICATORS
  getRoles():Observable<any>{
    return this.http.get<any>(this.url+'/role/index',this.access_token).pipe( 
      catchError((error: any) => {

        console.error('Error to get roles:', error);
        return of(error); 
      })
    )
  }

  
  getCategories():Observable<any>{
    return this.http.get<any>(this.url+'/category/index',this.access_token).pipe( 
      catchError((error: any) => {

        console.error('Error to get categories:', error);
        return of(error); 
      })
    )
  }




  ///////////////////////////////////////////////////////// USER
   getUserList():Observable<any>{
    console.log(this.access_token);
    return this.http.get<any>(this.url+'/user/index',this.access_token).pipe( 
      map((resp:any)=>{
        console.log(resp);
      return resp;

      
    }),
    catchError((error:any)=>{
      return of(error);
    }),
    
    )
  }

    
  storeUser(objeto:User):Observable<User>{
    return this.http.post<User>(this.url+'/user/store', objeto, this.access_token).pipe( 
     
    catchError((error:any)=>{
      console.error('Error al crear usuario:', error);
      return of(error);
    }),
    
    )
  }

  updateUser(objeto:User,id:number):Observable<User>{
    return this.http.put<User>(this.url+'/user/update/'+id, objeto, this.access_token).pipe( 
     
    catchError((error:any)=>{
      console.error('Error al actualizar usuario:', error);
      return of(error);
    }),
    
    )
  }

    
    DeleteUser(id:number):Observable<User>{
    return this.http.delete<User>(this.url+'/user/delete/ '+ id, this.access_token).pipe( 
      map((resp:any)=>{
      if(resp.message){
      return true;
     

      }else {
      return resp;
      }
    }),
    catchError((error:any)=>{
      return of(error);
    }),
    
    )
  }

  ///////////////////////////////////////////////////////// PRODUCT  
  getProductList():Observable<any>{
    console.log(this.access_token);
    return this.http.post<any>(this.url+'/product/index',this.access_token).pipe( 
      map((resp:any)=>{
        console.log(resp);
      return resp;

      
    }),
    catchError((error:any)=>{
      return of(error);
    }),
    
    )
  }

  storeProduct(object:any):Observable<any>{
    console.log(this.access_token);
    return this.http.post<any>(this.url+'/product/store',object,this.access_token).pipe( 
      map((resp:any)=>{
        console.log(resp);
      return resp;

      
    }),
    catchError((error:any)=>{
      return of(error);
    }),
    
    )
  }

  deleteProduct(id:number):Observable<any>{
    console.log(this.access_token);
    return this.http.delete<any>(this.url+'/product/delete/'+id,this.access_token).pipe( 
      map((resp:any)=>{
        console.log(resp);
      return resp;

      
    }),
    catchError((error:any)=>{
      return of(error);
    }),
    
    )
  }
  updateProduct(object:any,id:number):Observable<any>{
    console.log(this.access_token);
   //object={hola:'hola'}
    console.log(object);
    return this.http.post<any>(this.url+'/product/update/'+id,object,this.access_token).pipe( 
      map((resp:any)=>{
        console.log(resp);
      return resp;

      
    }),
    catchError((error:any)=>{
      return of(error);
    }),
    
    )
  }
}