import { Injectable, NgZone, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToasterService } from '../toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket!: Socket;

  private SERVER_URL = 'https://flowerbid.onrender.com'; // Backend URL
  private itemSubject = new BehaviorSubject<any>(null);
  item$ = this.itemSubject.asObservable();

  private bidValueSubject = new BehaviorSubject<any>(null);
  bidValue$ = this.bidValueSubject.asObservable();


  constructor(private toster:ToasterService, private ngZone:NgZone) {
    
  }

  connectSocket(){
    const token = localStorage.getItem('token');
    this.socket = io(this.SERVER_URL, {
      transports: ['websocket'],
     auth: {
        token: token
      }// Force WebSocket, disable polling
    });
  }

  getAuctionDetails(flowerId: string) {
    try {
      this.socket.emit('getAuctionDetails', flowerId);
  
      this.socket.off('auctionDetails'); // ✅ Prevent duplicate listeners
      this.socket.on('auctionDetails', (data) => {
        if (!data) throw new Error("No auction details received");
  
        this.itemSubject.next(data);
        this.bidValueSubject.next(data.currentBidPrice);
  
        if (data.status === 'live') {
          this.toster.showInfo("Auction started! Please Bid for a win", "Auction is Live");
        } else {
          this.toster.showInfo("Auction is yet to start", "Auction is Upcoming");
        }
      });
  
      // ✅ Handle socket errors
      this.socket.on('error', (error) => {
        console.error("Socket error in getAuctionDetails:", error);
        this.toster.showError("Failed to fetch auction details", "Socket Error");
        this.resetComponentState();
      });
  
    } catch (error) {
      console.error("Error in getAuctionDetails:", error);
      this.toster.showError("An error occurred while fetching auction details", "Error");
      this.resetComponentState();
    }
  }
  
  // Listen for Auction Start
  onAuctionStart(flowerId: string) {
    try {
      this.socket.off(`auctionStarted-${flowerId}`); // ✅ Prevent duplicate listeners
      this.socket.on(`auctionStarted-${flowerId}`, (data) => {
        if (!data) throw new Error("No auction start data received");
  
        this.toster.showInfo("Auction has started! Please Bid to win", "Auction is Live");
        this.itemSubject.next(data);
        this.bidValueSubject.next(data.currentBidPrice);
      });
  
      this.socket.on('error', (error) => {
        console.error("Socket error in onAuctionStart:", error);
        this.toster.showError("An error occurred while receiving auction start updates", "Socket Error");
      });
  
    } catch (error) {
      console.error("Error in onAuctionStart:", error);
      this.toster.showError("Failed to receive auction start updates", "Error");
    }
  }
  
  // Listen for Bid Updates
  onBidUpdate(flowerId: string) {
    try {
      this.socket.off(`bidUpdated`); // ✅ Remove previous listeners before adding a new one 
  
      this.socket.on(`bidUpdated`, (data) => { // ✅ Listens for updates continuously
        if (!data) throw new Error("No bid update received");
  
        this.toster.showSuccess("Bid updated", "Bid has been placed");
        this.itemSubject.next(data.flower);
        this.bidValueSubject.next(data.currentBidPrice);
      });
  
      this.socket.off('bidError'); // ✅ Ensure no duplicate error listeners
      this.socket.on('bidError', (error) => { // ✅ Handle errors properly
        console.error("Socket error in onBidUpdate:", error);
        this.toster.showError("An error occurred while receiving bid updates", "Socket Error");
      });
  
    } catch (error) {
      console.error("Error in onBidUpdate:", error);
      this.toster.showError("Failed to receive bid updates", "Error");
    }
  }
  
  
  
  // ✅ Function to Reset Component Variables When Socket Breaks
  resetComponentState() {
    this.itemSubject.next(null);
    this.bidValueSubject.next(null);
  }
  

  // Emit Auction Start for a Specific Flower
  startAuction(flowerId: string) {
    this.socket.emit('startAuction', flowerId);
  }

  // Emit Place Bid for a Specific Flower
  placeBid(flowerId: string, bidPrice: number) {
    this.socket.emit('placeBid', { flowerId, bidPrice });
  }

  updateBidValue(newBid: number) {
    this.bidValueSubject.next(newBid); // Emit new value
  }

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
