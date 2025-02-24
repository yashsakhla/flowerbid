import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faGavel, faPlus, faPhone, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CountdownModule } from 'ngx-countdown';
import { SocketService } from '../../services/socket/socket.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToasterService } from '../../services/toaster/toaster.service';
import { catchError, combineLatest, filter, Observable, of, startWith, Subscription } from 'rxjs';
import { LoaderComponent } from '../loader/loader.component';
import { CountdownComponent } from '../countdown/countdown.component';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, CountdownModule, FormsModule, LoaderComponent, CountdownComponent],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent implements OnInit, OnDestroy {
  faArrow = faArrowRight;
  faG =faGavel;
  faPlus=faPlus;
  faPhone = faPhone;
  faHeart = faHeart;
  bidValue$!:Observable<any>;
  flowerId:any;
  isUserLoggedIn:any;
  item$!:Observable<any>;
  item: any;
  bidValue: any;
  loader!:boolean;
  private subscription: Subscription = new Subscription();

  constructor(private router:ActivatedRoute, private route:Router, private socket:SocketService, private auth:AuthService, private toaster:ToasterService, private cdRef:ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.loader = true;
    this.isUserLoggedIn = this.auth.isUserLoggedIn;
     this.flowerId = this.router.snapshot.paramMap.get('id')!;
     if (this.flowerId && this.isUserLoggedIn) {
      this.bidingSocket();
     }

  }

  bidingSocket(){
     // Get auction details for this flower
     this.socket.connectSocket()
     this.startAuction();
     this.socket.getAuctionDetails(this.flowerId);
     this.socket.onAuctionStart(this.flowerId);
     this.socket.onBidUpdate(this.flowerId);
     this.subscription.add(
      this.socket.item$.subscribe(data => {
        this.item = data;
        this.bidValue = this.item.currentBidPrice;
        if(this.item !== null){
          this.loader = false;
        }
      })
    );
  }
  

  startAuction() {
    this.socket.startAuction(this.flowerId);
  }

  // Place a bid for this flower
  placeBid() {
    if (this.bidValue > this.item.currentBidPrice) {
      this.socket.placeBid(this.flowerId, this.bidValue);
      console.log(`Bid placed: ₹${this.bidValue}`);
    } else {
      this.toaster.showError("Bid must be higher than current price.","Increase your Bid Amount");
      console.log('Bid must be higher than current price.');
    }
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

  refresh(){

  }
}
