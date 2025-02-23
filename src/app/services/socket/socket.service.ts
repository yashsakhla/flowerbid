import { Injectable, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private SERVER_URL = 'https://flowerbid.onrender.com'; // Backend URL

  constructor() {
    this.socket = io(this.SERVER_URL, {
      transports: ['websocket'], // Force WebSocket, disable polling
    });
  }

  // Get Auction Details for a Specific Flower
  getAuctionDetails(flowerId: string): Observable<any> {
    this.socket.emit('getAuctionDetails', flowerId);
    return new Observable(observer => {
      this.socket.on('auctionDetails', data => observer.next(data));
    });
  }

  // Listen for Auction Start for a Specific Flower
  onAuctionStart(flowerId: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(`auctionStarted-${flowerId}`, data => observer.next(data));
    });
  }

  // Listen for Bid Updates for a Specific Flower
  onBidUpdate(flowerId: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(`bidUpdated-${flowerId}`, data => observer.next(data));
    });
  }

  // Emit Auction Start for a Specific Flower
  startAuction(flowerId: string) {
    this.socket.emit('startAuction', flowerId);
  }

  // Emit Place Bid for a Specific Flower
  placeBid(flowerId: string, bidPrice: number) {
    this.socket.emit('placeBid', { flowerId, bidPrice });
  }

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
