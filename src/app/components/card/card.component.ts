import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faBusinessTime, faCaretDown, faCaretUp, faGavel, faSliders } from '@fortawesome/free-solid-svg-icons';
import { CountdownComponent } from '../countdown/countdown.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,FormsModule,FontAwesomeModule, CountdownComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() item: any;
    faA = faArrowDown;
    faF = faSliders;
    faD =faCaretDown;
    faU = faCaretUp;
    faG = faGavel;
    faB = faBusinessTime;

    constructor(private router:Router){

    }

    getCountdownParts(startDate: string) {
      const now = new Date().getTime(); // Get current time in milliseconds
      const targetDate = new Date(startDate).getTime(); // Parse startDate in milliseconds
    
      const diff = targetDate - now; // Difference in milliseconds
      const leftTime = Math.max(0, Math.floor(diff / 1000)); // Convert to seconds (ensure no negative)
    
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
    

  redirectToCard(){
    this.router.navigate([`auction-item/${this.item._id}`]);
  }
}
