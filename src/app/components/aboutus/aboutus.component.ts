import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowDown,
  faAsterisk,
  faBusinessTime,
  faCheckToSlot,
  faCircleCheck,
  faGavel,
  faCheckCircle,
  faBox,
  faHandshake,
  faHammer,
  faPhoneAlt,
  faStop,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss',
})
export class AboutusComponent {
  faA = faAsterisk;
  faC = faCircleCheck;
  faArrow = faArrowDown;
  faG = faGavel;
  faB = faBusinessTime;
  faCheck = faCheckToSlot;
  faCC = faCircleCheck;
  faFaceSmile = faFaceSmile;
  faBox = faBox;
  faHand = faHandshake;
  faHa = faHammer;
  faPh = faPhoneAlt;
  faS = faStop;
  faPlus = faPlus;
  faMinus = faMinus;

  faq = [
    {
      show:false,
      que:'What is An Auction?',
      ans:'An auction is a public sale where goods or services are sold to the highest bidder. Bidders compete to offer the highest price, and the item is awarded to the bidder with the highest bid when the auction ends.'
    },
    {
      show:false,
      que:'How Do Auctions Work?',
      ans:'Auctions allow items to be sold to the highest bidder. Participants bid on the item until the highest bid is reached within a set timeframe. The highest bidder wins and pays the bid amount.'
    },
    {
      show:false,
      que:'What Types Of Auctions Are There?',
      ans:'Types of auctions include English (ascending bid), Dutch (descending bid), sealed-bid (highest bid wins), and Vickrey (sealed-bid, second-highest bid wins). Additionally, there are reverse (lowest bid wins) and silent (secret bids) auctions, catering to various selling dynamics and bidder preferences.'
    },
    {
      show:false,
      que:'Who Can Participate In Auctions?',
      ans:'Anyone meeting auction requirements, typically 18 years or older, can participate. Registration may be necessary, depending on the auction platform. Ensure compliance with specific auction rules and regulations.'
    },
    {
      show:false,
      que:'What Happens If I Win An Auction?',
      ans:'If you win an auction, youre obligated to purchase the item at the winning bid price. Follow payment instructions provided by the auction platform. Non-compliance may lead to penalties or account suspension.'
    }
  ]

  showItem(i:any){
    this.faq[i].show = !this.faq[i].show;
  }
}
