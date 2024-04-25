import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
 
  constructor() { }


  private responseSubject = new Subject<any>();
  response$ = this.responseSubject.asObservable();

  private responseSubject2 = new Subject<any>();
  response2$ = this.responseSubject2.asObservable();



  sendResponse(response:any) {
    this.responseSubject.next(response);
  }

  exposeSendResponse() {
    (window as any).sendResponse = this.sendResponse.bind(this);
  }

  sendResponse2(response:any) {
    this.responseSubject2.next(response);
  }

  exposeSendResponse2() {
    (window as any).sendResponse2 = this.sendResponse2.bind(this);
  }
}
