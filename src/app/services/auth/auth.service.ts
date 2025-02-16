import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isUserLoggedIn:boolean = false;

  setAuth(token:string){
    localStorage.setItem('token',token);
    this.isUserLoggedIn = token !='' ? true : false;
  }

  getAuth(){
    return this.isUserLoggedIn;
  }

  logOutUser(){
    localStorage.removeItem('token');
    this.isUserLoggedIn = false;
  }
}
