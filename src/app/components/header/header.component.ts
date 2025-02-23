import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {faHeadset, faSearch, faBars, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  faEnvelope = faEnvelope;
  faHeadset = faHeadset;
  faSearch = faSearch;
  faBars = faBars;
  faArrow = faArrowRight;
  isUserLogeedIn:boolean = false; 
  sidebarOpen!: boolean;
  isMobileView!: boolean;
  searchValue:string= '';

  constructor(private router:Router, public auth:AuthService){

  }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  navigate(url:string){
    this.router.navigate([url]);
    this.sidebarOpen = false;
  }

  redirect(path:string){
    this.sidebarOpen = false;
    this.router.navigate([path]);
  }

  logout(){
    this.auth.isUserLoggedIn = false;
    this.router.navigate(['login']);
  }
  
  redirectToauction(){
    this.sidebarOpen = false;
    this.router.navigate(['auction'],{ queryParams: { search: this.searchValue } });
  }
}
