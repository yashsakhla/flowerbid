import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown,faSliders, faCaretDown, faCaretUp, faGavel, faBusinessTime, faCheckToSlot, faSearch, faCross, faCancel, faClose } from '@fortawesome/free-solid-svg-icons';
import { CountdownModule } from 'ngx-countdown';
import { CardComponent } from '../card/card.component';
import { RestService } from '../../services/rest/rest.service';
import { LoaderComponent } from '../loader/loader.component';
import { ToasterService } from '../../services/toaster/toaster.service';

@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, CountdownModule, FormsModule, CardComponent, LoaderComponent],
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.scss'
})
export class AuctionsComponent implements OnInit {
  faA = faArrowDown;
  faF = faSliders;
  faD =faCaretDown;
  faU = faCaretUp;
  faG = faGavel;
  faB = faBusinessTime;
  faCheck = faCheckToSlot;
  faSearch = faSearch;
  faCross = faClose;

  isOpen = false;
  showFilter:boolean = false;
  price: number = 500; // Default value
  minPrice: number = 0;
  maxPrice: number = 1000;

  items:any[]=[];
  categories:any[] = [];
  loader!:boolean;
  failed!: boolean;
  search!:string;

  constructor(private router:Router, private rest:RestService, private toaster:ToasterService, private aRoute:ActivatedRoute){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); 
      }
    });
  }

  ngOnInit(): void {
    
    this.aRoute.queryParams.subscribe((res:any)=>{
      this.search = res.search;
      if(this.search){
        this.searchCall();
      }else{
        this.getAuctionItem();
      }
    })
  }

  getAuctionItem(){
    this.loader = true;
    this.rest.fetchAuction().subscribe(
      {
        next:(res:any)=>{
          this.items = res;
          res.forEach((ele:any) => {
            if (!this.categories.some((cat:any) => cat.name === ele.category)) {
              this.categories.push({name:ele.category,selected:false});
            }
          });
          this.loader = false;
        },
        error:(err:Error)=>{
          this.failed = true;
          this.loader = false;
          this.toaster.showError('Error','Error Fetching Auction Itmes');
        }
      }
    )
  }

  refreshPage(){
    window.location.reload();
  }

  updatePrice(event: Event) {
    this.price = (event.target as HTMLInputElement).valueAsNumber;
  }

  getSliderBackground(): string {
    const percentage = ((this.price - this.minPrice) / (this.maxPrice - this.minPrice)) * 100;
    return `linear-gradient(to right, black ${percentage}%, #ddd ${percentage}%)`;
  }


  filter(){
    this.showFilter = !this.showFilter;
    console.log('2')
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

  filterCall(){
    
  const selectedCategoriesString = this.categories
  .filter(category => category.selected) // Filter selected categories
  .map(category => category.name) // Extract names
  .join(', ');
  const price = this.price;
  const param = `category=${selectedCategoriesString}&minPrice=0&maxPrice=${price}`
    this.rest.fetchFilterDetails(param).subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          this.items = res;
        },
        error:(err:Error)=>{

        }
      }
    );
  }

  searchCall(){
    const param = `name=${this.search}`
    this.rest.fetchFilterDetails(param).subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          this.items = res;
        },
        error:(err:Error)=>{

        }
      }
    );
  }
}
