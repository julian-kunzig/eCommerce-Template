import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable,ReplaySubject } from 'rxjs';
import {chatMessages} from '../../../static-data/chat-messages';
@Injectable({
    providedIn: 'root'
})
export class ChatService {
    messages = chatMessages;
    drawerOpen = new BehaviorSubject<boolean>(false);
    drawerOpen$ = this.drawerOpen.asObservable();

    private messageSource = new BehaviorSubject(0);
    currentMessage = this.messageSource.asObservable();
  
    
  
    changeMessage(message: number) {
      this.messageSource.next(message);      
    }
    constructor() {}
}
