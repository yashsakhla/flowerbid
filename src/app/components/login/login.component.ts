import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { RestService } from '../../services/rest/rest.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLogin = true;
  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '', phoneNo:'' };
  loader:boolean = false;

  constructor(private rest:RestService, private router:Router, private auth:AuthService){

  }

  onLogin() {
    this.loader = true;
    const payload = {
      "email": "rohit@gmail.com",
      "password": "admin786",
    }
    this.rest.login(payload).subscribe((res:any)=>{
      if(res){
        this.loader = false;
        this.auth.setAuth(res.token);
        this.router.navigate(['home'])
      }
    })
  }

  onRegister() {
    const payload = {
      "username": "demo1",
      "email": "demouser@gmail.com",
      "password": "$2b$10$if2zRVM00NmEA1TBQyHlteOX8CfRK4p2seObpKDI2ah.Uay1D5UKm",
      "mobile": 9673683678,
    }
   this.rest.registeration(payload).subscribe((res:any)=>{
      console.log(res)
    })
  }
}
