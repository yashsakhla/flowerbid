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

  fetchCategory(){
    return this.http.get("https://flowerbid.onrender.com/api/flowers/category");
  }

  fetchAuction(){
    return this.http.get(`https://flowerbid.onrender.com/api/flowers/available`);
  }

  fetchFilterDetails(search:string){
    return this.http.get(`https://flowerbid.onrender.com/api/flowers/available?${search}`);
  }

  fetchUserDetail(){
    return this.http.get(`https://flowerbid.onrender.com/api/user/profile`);
  }

  updateUserDetails(userDetails:any){
    return this.http.put(`https://flowerbid.onrender.com/api/user/update`,userDetails);
  }
}
