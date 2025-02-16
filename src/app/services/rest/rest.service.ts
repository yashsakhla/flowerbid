import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }

  login(payload:any){
    return this.http.post('https://flowerbid.onrender.com/api/auth/login',
      payload
    )
  }

  registeration(payload:any){
    return this.http.post('https://flowerbid.onrender.com/api/auth/signup',
      payload
    )
  }

  fetchItems(){

  }
}
