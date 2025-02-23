import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isUserLoggedIn!:boolean;

  setAuth(token:string){
    localStorage.setItem('token',token);
  }

  getAuth(){
    return this.isUserLoggedIn;
  }

  logOutUser(){
    localStorage.removeItem('token');
    this.isUserLoggedIn = false;
  }
}
