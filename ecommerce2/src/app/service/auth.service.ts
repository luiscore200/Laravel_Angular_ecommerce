import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Router } from '@angular/router';

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
    if(localStorage.getItem("access_token")){
      user=localStorage.getItem("user");
      user= JSON.parse(localStorage.getItem("user") ?? '');
      return user;
      
    }else{
    
      return null;
      
    }
  }


  isAuthenticated() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem("access_token") && localStorage.getItem("user")) {
      let token = this.getToken();
      let expiration = (JSON.parse(atob(token.split('.')[1]))).exp;
      // si el token ha expirado, recargar la vista y retornar falso
      if (Math.floor((new Date).getTime() / 1000) >= expiration) {
        this.logout();
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  
  logout(){
    if(localStorage.getItem("access_token") && localStorage.getItem("user")){
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    document.location.reload();
    }
  }
}
