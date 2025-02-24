import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {
  @Input() endDateTime!: string; // Passed from parent component
  @Input() detail!:boolean;

  countdown = { days: '00', hours: '00', minutes: '00', seconds: '00' };
  private intervalId: any;

  ngOnInit() {
    console.log('timer')
    this.updateCountdown(); // Initial call
    this.intervalId = setInterval(() => {
      this.updateCountdown(); // Update every second
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear interval when component is destroyed
    }
  }

  updateCountdown() {
    if (!this.endDateTime) return;
    const now = new Date();
    const targetDate = new Date(this.endDateTime);

    const diff = targetDate.getTime() - now.getTime();
    const leftTime = diff > 0 ? Math.floor(diff / 1000) : 0;

    const days = Math.floor(leftTime / 86400);
    const hours = Math.floor((leftTime % 86400) / 3600);
    const minutes = Math.floor((leftTime % 3600) / 60);
    const seconds = leftTime % 60;

    this.countdown = {
      days: days < 10 ? `0${days}` : `${days}`,
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
    };
  }
}
