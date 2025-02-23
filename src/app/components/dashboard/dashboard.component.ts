import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown,faGavel, faBusinessTime, faCheckToSlot, faGauge, faCreditCard, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { CardComponent } from '../card/card.component';
import { AuthService } from '../../services/auth/auth.service';
import { RestService } from '../../services/rest/rest.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, CardComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

      faArrow = faArrowDown;
      faG = faGavel;
      faB = faBusinessTime;
      faCheck = faCheckToSlot;
      show='Dashboard';
      isUserLoggedIn!:boolean;

  menuItems = [
    { name: 'Dashboard', icon: faGauge },
    { name: 'My Auction', icon: faGavel },
    { name: 'Payment', icon: faCreditCard },
    { name: 'Settings', icon: faGear },
    { name: 'Help and Support', icon: faCircleQuestion },
    { name: 'Logout', icon: faRightFromBracket },
  ];

  tableData = [
    { auctionId: '12584885455', productName: 'Porcelain', amount: '$1800', status: 'Winning', statusClass: 'winning', auctionDate: 'June 25, 2024' },
    { auctionId: '12584885482', productName: 'Old Clocks', amount: '$1900', status: 'Winning', statusClass: 'winning', auctionDate: 'June 13, 2024' },
    { auctionId: '12584885536', productName: 'Manuscripts', amount: '$2000', status: 'Cancel', statusClass: 'cancel', auctionDate: 'June 2, 2024' },
    { auctionId: '12584885548', productName: 'Renaissance Art', amount: '$2100', status: 'Winning', statusClass: 'winning', auctionDate: 'June 8, 2024' },
    { auctionId: '12584885563', productName: 'Impressionism Art', amount: '$2200', status: 'Winning', statusClass: 'winning', auctionDate: 'June 21, 2024' }
  ];

  items = [
    {
      image: 'assets/images/product.png',
      title: 'Zenith auto elevating driving your experience',
      currentBid: 200,
      lotNumber: '25896742',
      isLive:true,
      isEnded:false,
      upcoming:false,
      startDate:'2025-02-09 16:50:00'
    },
    {
      image: 'assets/images/product.png',
      title: 'Heritage had curating watch time treasures.',
      currentBid: 3780,
      lotNumber: '25896752',
      bidderName: 'Wyatt Matthew',
      bidderImage: 'assets/images/product.png',
      isLive:true,
      isEnded:false,
      upcoming:false,
      startDate:'2025-02-09 16:50:00'
    },
    {
      image: 'assets/images/product.png',
      title: 'Canvas code redefining art in the digital realm.',
      currentBid: 4564,
      lotNumber: '25896755',
      bidderName: 'Julian Gabriel',
      bidderImage: 'assets/images/product.png',
      isLive:false,
      isEnded:false,
      upcoming:true,
      startDate:'2025-02-13 16:50:00'
    },
    {
      image: 'assets/images/product.png',
      title: 'Nomism on nexus connecting collectors to coins.',
      currentBid: 5635,
      lotNumber: '25896652',
      bidderName: 'Jacob Logan',
      bidderImage: 'assets/images/product.png',
      isLive:true,
      isEnded:false,
      upcoming:false,
      startDate:'2025-02-09 16:50:00'
    },
    {
      image: 'assets/images/product.png',
      title: 'Nomism on nexus connecting collectors to coins.',
      currentBid: 5635,
      lotNumber: '25896652',
      bidderName: 'Jacob Logan',
      bidderImage: 'assets/images/product.png',
      isLive:true,
      isEnded:false,
      upcoming:false,
      startDate:'2025-02-09 16:50:00'
    },
    {
      image: 'assets/images/product.png',
      title: 'Nomism on nexus connecting collectors to coins.',
      currentBid: 5635,
      lotNumber: '25896652',
      bidderName: 'Jacob Logan',
      bidderImage: 'assets/images/product.png',
      isLive:true,
      isEnded:false,
      upcoming:false,
      startDate:'2025-02-09 16:50:00'
    },
    {
      image: 'assets/images/product.png',
      title: 'Canvas code redefining art in the digital realm.',
      currentBid: 4564,
      lotNumber: '25896755',
      bidderName: 'Julian Gabriel',
      bidderImage: 'assets/images/product.png',
      isLive:false,
      isEnded:false,
      upcoming:true,
      startDate:'2025-02-13 16:50:00'
    },
    {
      image: 'assets/images/product.png',
      title: 'Canvas code redefining art in the digital realm.',
      currentBid: 4564,
      lotNumber: '25896755',
      bidderName: 'Julian Gabriel',
      bidderImage: 'assets/images/product.png',
      isLive:false,
      isEnded:false,
      upcoming:true,
      startDate:'2025-02-13 16:50:00'
    },
  ];
  showItems: string = 'Active';

  userDetails:any;

  constructor(private router:Router, private auth:AuthService, private rest:RestService){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.auth.isUserLoggedIn;
    this.getUser();
  }

  getUser(){
    this.rest.fetchUserDetail().subscribe((res:any)=>{
      this.userDetails = res;
    })
  }

  updateInfo(){
    console.log(this.userDetails)
    this.rest.updateUserDetails(this.userDetails).subscribe({
      next:(res:any)=>{
        console.log(res)
      },
      error:(err:Error)=>{

      }
    })
  }

  changeTab(name:string){
    this.show = name;
  }

  showItem(name:string){
    this.showItems = name;
  }

  redirect(){
    this.router.navigate(['login'])
  }
}
