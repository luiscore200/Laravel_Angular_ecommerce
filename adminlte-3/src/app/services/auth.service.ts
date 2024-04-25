import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    
  }

  saveLocalStorage(resp:any){
    if(resp.access_token && resp.user){
      localStorage.setItem('access_token',resp.access_token);
      localStorage.setItem('user',JSON.stringify(resp.user));
      localStorage.setItem('role',resp.role);
    
      return true;
    }
    return false;
  }

  getToken(){
    let access_token;
    if(localStorage.getItem("access_token")){
      access_token=localStorage.getItem("access_token")?? '';
      return access_token;
    }else{
      access_token='';
      return access_token;
      
    }
  }
  getUser(){
    let user;
    if(localStorage.getItem("user")){
     
      user= JSON.parse(localStorage.getItem("user") ?? '');
      return user;
      
    }else{
    
      return null;
      
    }
  }

  getRole(){
    let role;
    if(localStorage.getItem("role")){
     
      role= localStorage.getItem("role") ?? '';
      return role;
      
    }else{
    
      return null;
      
    }
  }


  isAuthenticated(){
    if(localStorage.getItem("access_token") && localStorage.getItem("user")){
      let token=this.getToken();
      let expiration = (JSON.parse(atob(token.split('.')[1]))).exp;
      //si token ha expirado, recargar la vista, retornar falso
      if(Math.floor((new Date).getTime()/1000)>= expiration){
        this.logout();
        return false;
    
      }else{
        return true;
      }
     
    }else{
      return false;

    }
    
  
  }

  logout(){
  
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    document.location.reload();
  }
}
