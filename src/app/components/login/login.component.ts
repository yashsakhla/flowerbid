import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { RestService } from '../../services/rest/rest.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderComponent } from '../loader/loader.component';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from '../../services/toaster/toaster.service';

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

  constructor(private rest:RestService, private router:Router, private auth:AuthService, private toaster:ToasterService){

  }

  onLogin() {
    this.loader = true;
    const payload = {
      "email": this.loginData.email,
      "password": this.loginData.password,
    }
    this.rest.login(payload).subscribe((res:any)=>{
      if(res){
        this.auth.setAuth(res.token);
        this.auth.isUserLoggedIn = true;
        this.loader = false;
        this.router.navigate(['home'])
        this.toaster.showSuccess("Successfully logged In","Success");
      }
    })
  }

  onRegister() {
    const payload = {
      "username": this.registerData.name,
      "email": this.registerData.email,
      "password": this.registerData.password,
      "mobile": this.registerData.phoneNo,
    }
   this.rest.registeration(payload).subscribe(
    {
      next:(res:any)=>{
        this.toaster.showSuccess("Successfully Register","Success");
        this.isLogin = true;
      },
      error:(err:Error)=>{

      }
    }
   )
  }
}
