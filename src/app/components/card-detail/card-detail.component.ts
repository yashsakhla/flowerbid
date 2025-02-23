import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faGavel, faPlus, faPhone, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CountdownModule } from 'ngx-countdown';
import { SocketService } from '../../services/socket/socket.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToasterService } from '../../services/toaster/toaster.service';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, CountdownModule, FormsModule],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent implements OnInit, OnDestroy {
  faArrow = faArrowRight;
  faG =faGavel;
  faPlus=faPlus;
  faPhone = faPhone;
  faHeart = faHeart;
  bidValue!:number;
  flowerId!:any;
  isUserLoggedIn:any;
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

  constructor(private router:ActivatedRoute, private route:Router, private socket:SocketService, private auth:AuthService, private toaster:ToasterService){

  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.auth.isUserLoggedIn;
     this.flowerId = this.router.snapshot.paramMap.get('id')!;
     if (this.flowerId && this.isUserLoggedIn) {
      // Get auction details for this flower
      this.startAuction();
      this.socket.getAuctionDetails(this.flowerId).subscribe(data => {
        this.item = data;
        this.bidValue = data.currentBidPrice;
      });

      // Listen for auction start for this flower
      this.socket.onAuctionStart(this.flowerId).subscribe(data => {
        this.item = data;
        this.bidValue = data.currentBidPrice;
        this.toaster.showInfo("Bid Has Started","place your Bid")
      });

      // Listen for bid updates for this flower
      this.socket.onBidUpdate(this.flowerId).subscribe(data => {
        this.item = data;
        this.bidValue = data.currentBidPrice;
        this.toaster.showSuccess("Bid has been Placed","Bid Updated");
      });
    }
  }

  startAuction() {
    this.socket.startAuction(this.flowerId);
  }

  // Place a bid for this flower
  placeBid() {
    if (this.bidValue > this.item.currentBidPrice) {
      this.socket.placeBid(this.flowerId, this.bidValue);
    } else {
      alert("Your bid must be higher than the current price!");
    }
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

  redirect(){
    this.route.navigate(['login']);
  }

  ngOnDestroy(): void {
    // this.socket.disconnectSocket();
  }
}
