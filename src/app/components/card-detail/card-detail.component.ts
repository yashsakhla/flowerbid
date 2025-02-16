import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faGavel, faPlus, faPhone, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, CountdownModule, FormsModule],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {
  faArrow = faArrowRight;
  faG =faGavel;
  faPlus=faPlus;
  faPhone = faPhone;
  faHeart = faHeart;
  bidValue:number = 123;

  item:any = {
    image: 'assets/images/product.png',
    title: 'Zenith auto elevating driving your experience',
    desc:'Zenith auto elevating driving your experience. Zenith auto elevating driving your experience',
    currentBid: 200,
    lotNumber: '25896742',
    isLive:true,
    isEnded:false,
    upcoming:false,
    startDate:'2025-02-09 16:50:00'
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

  incBid(){
    this.bidValue += 5;
  }
}
