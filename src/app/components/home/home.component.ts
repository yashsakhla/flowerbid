import { Component, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAsterisk, faCircleCheck, faArrowDown, faGavel, faBusinessTime, faCheckToSlot, faHandshake, faHammer, faPhoneAlt, faStop, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CountdownModule } from 'ngx-countdown';
import { NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, CardComponent, CommonModule, CarouselModule, CountdownModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  faA = faAsterisk;
  faC = faCircleCheck;
  faArrow = faArrowDown;
  faG = faGavel;
  faB = faBusinessTime;
  faCheck = faCheckToSlot;
  faHand = faHandshake;
  faHa = faHammer;
  faPh = faPhoneAlt;
  faS = faStop;
  faPlus = faPlus;
  faMinus = faMinus;

  @ViewChild('auctionCarousel', { static: false }) auctionCarousel!: CarouselComponent;
  @ViewChild('categoryCarousel', { static: false }) categoryCarousel!: CarouselComponent;

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
  isMobileView!: boolean;

  constructor(private router:Router){
    this.isMobileView = window.innerWidth < 1200;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }
    });
  }

  flowerCategories = [
    { name: 'Roses', image: 'assets/images/product.png', itemCount: 120 },
    { name: 'Lilies', image: 'assets/images/product.png', itemCount: 95 },
    { name: 'Tulips', image: 'assets/images/product.png', itemCount: 150 },
    { name: 'Orchids', image: 'assets/images/product.png', itemCount: 80 },
    { name: 'Sunflowers', image: 'assets/images/product.png', itemCount: 60 },
    { name: 'Daisies', image: 'assets/images/product.png', itemCount: 45 },
    { name: 'Lotus', image: 'assets/images/product.png', itemCount: 110 },
    { name: 'Jasmine', image: 'assets/images/product.png', itemCount: 30 }
  ];
  

  category = [
    { item: 'Rose', selected: true },
    { item: 'Sunflower', selected: false },
    { item: 'Lilly', selected: false },
    { item: 'Lotus', selected: false },
    { item: 'White Rose', selected: false }
  ];

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 2000,
    items: window.innerWidth < 1024 ? 1 : 4,
    nav: false,
    dots: false
  };

  categoryOptions: OwlOptions = {
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 2000,
    items: window.innerWidth < 1024 ? 2 : 6,
    nav: false,
    dots: false
  };

  isAutoplaying = true;

  ngAfterViewInit() {
    // Ensure carousel is initialized before modifying autoplay
    setTimeout(() => this.resumeAutoplay(), 500);
  }

  pauseAutoplay() {
    if (this.auctionCarousel) {
      this.auctionCarousel.stopAutoplay();
      this.isAutoplaying = false;
    }
  }

  pauseCatAutoplay() {
    if (this.categoryCarousel) {
      this.categoryCarousel.stopAutoplay();
      this.isAutoplaying = false;
    }
  }

  resumeAutoplay() {
    if (this.auctionCarousel) {
      this.auctionCarousel.startAutoplay();
      this.isAutoplaying = true;
    }
    if (this.categoryCarousel) {
      this.categoryCarousel.startAutoplay();
      this.isAutoplaying = true;
    }
  }

  prevSlide() {
    this.pauseAutoplay();
    this.auctionCarousel.prev();
    this.resumeAutoplay();
  }

  nextSlide() {
    this.pauseAutoplay();
    this.auctionCarousel.next();
    this.resumeAutoplay();
  }

  prevCatSlide(){
    this.pauseCatAutoplay();
    this.categoryCarousel.prev();
    this.resumeAutoplay();
  }

  nextCatSlide(){
    this.pauseCatAutoplay();
    this.categoryCarousel.next();
    this.resumeAutoplay();
  }

  onCatselect(item:string){
   this.category = this.category.map(flower => ({
      ...flower,
      selected: flower.item === item
    }));
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

  redirect(path:string){
    this.router.navigate([path]);
  }

  redirectToCard(item:any){
    this.router.navigate([`auction-item/${item.id}`]);
  }
  
  showItem(i:any){
    this.faq[i].show = !this.faq[i].show;
  }
  
}
