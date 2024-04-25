import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login:'http://127.0.0.1:8000/api/auth/login',

  }
  constructor() { }


 

  //validar
  TokenVerify(token:any):boolean {
  
    if(token){
      const payload= this.payload(token); 
      if(payload){
        return Object.values(this.iss).indexOf(payload.iss)>-1? true: false;
      }
    }
    return false;
    
  }
 //separar la carga util
  payload(token:any){
    const payload= token.split('.')[1]; 
     return this.decode(payload);
  }
  //decodificar
  decode(payload:any){
    return JSON.parse(atob(payload));
  }


}
