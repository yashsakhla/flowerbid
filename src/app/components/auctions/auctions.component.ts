import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown,faSliders, faCaretDown, faCaretUp, faGavel, faBusinessTime, faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, CountdownModule],
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.scss'
})
export class AuctionsComponent {
  faA = faArrowDown;
  faF = faSliders;
  faD =faCaretDown;
  faU = faCaretUp;
  faG = faGavel;
    faB = faBusinessTime;
    faCheck = faCheckToSlot;

  isOpen = false;

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
      startDate:'2025-02-16 16:50:00'
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

  constructor(private router:Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); 
      }
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  getCountdownParts(startDate: string) {
    const now = new Date(); // Current time
    const targetDate = new Date(startDate.replace(/-/g, '/')); // Parse startDate
  
    const diff = targetDate.getTime() - now.getTime(); // Difference in milliseconds
    const leftTime = diff > 0 ? Math.floor(diff / 1000) : 0; // Convert to seconds
  
    const days = Math.floor(leftTime / 86400);
    const hours = Math.floor((leftTime % 86400) / 3600);
    const minutes = Math.floor((leftTime % 3600) / 60);
    const seconds = leftTime % 60;
  
    return {
      days: days < 10 ? `0${days}` : days,
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  }
}
