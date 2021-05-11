import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import icSearch from '@iconify/icons-ic/twotone-search';
import icChat from '@iconify/icons-ic/twotone-chat';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { Observable, of, Subscription } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { trackById } from '../../../@vex/utils/track-by';
import { chats } from '../../../static-data/chats';
import { stagger80ms } from '../../../@vex/animations/stagger.animation';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icDoNotDisturb from '@iconify/icons-ic/twotone-do-not-disturb';
import icOfflineBolt from '@iconify/icons-ic/twotone-offline-bolt';
import { OnlineStatus } from '../../../@vex/layout/toolbar/toolbar-user/toolbar-user-dropdown/toolbar-user-dropdown.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChatService } from './chat.service';
import {Offer, Proposal} from '../../providers/campaign.service';
import { DataService } from 'src/app/providers/data.service';


export interface Chat {
  id: any;
  imageSrc: string;
  from: string;
  status: string;
  message: string;
  unreadCount: number;
  timestamp: string;
}
export interface ChatMessage {
  id: number;
  from: 'me' | 'partner';
  message: string;
  type: 'message' | 'offer' | 'proposal';
  offer?: Offer;
  proposal?: Proposal;
}

@UntilDestroy()
@Component({
  selector: 'vex-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms,
    stagger80ms
  ]
})
export class ChatComponent implements OnInit, OnDestroy {

  chats$: Observable<Chat[]> = of(chats).pipe(
      // Fix to allow stagger animations with static data
      delay(0)
  );

  mobileQuery = this.mediaMatcher.matchMedia('(max-width: 959px)');
  drawerOpen$ = this.chatService.drawerOpen$;
  
  
  public subscription: Subscription;


  statuses: OnlineStatus[] = [
    {
      id: 'online',
      label: 'Online',
      icon: icCheckCircle,
      colorClass: 'text-green'
    },
    {
      id: 'away',
      label: 'Away',
      icon: icAccessTime,
      colorClass: 'text-orange'
    },
    {
      id: 'dnd',
      label: 'Do not disturb',
      icon: icDoNotDisturb,
      colorClass: 'text-red'
    },
    {
      id: 'offline',
      label: 'Offline',
      icon: icOfflineBolt,
      colorClass: 'text-gray'
    }
  ];

  activeStatus: OnlineStatus = this.statuses[0];
  conversationList$: Observable<Object>;
  IsReaded: boolean = false;

  icCheckCircle = icCheckCircle;
  icSearch = icSearch;
  icChat = icChat;
  trackById = trackById;
  private _mobileQueryListener: () => void;


  constructor(private cd: ChangeDetectorRef,
              private router: Router,
              private mediaMatcher: MediaMatcher,
              private route: ActivatedRoute,
              private dataService:DataService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.mobileQuery.matches ? this.closeDrawer() : this.openDrawer();
    this._mobileQueryListener = () => {
      this.mobileQuery.matches ? this.closeDrawer() : this.openDrawer();
      this.cd.detectChanges();
    };
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        filter(() => this.mobileQuery.matches),
        untilDestroyed(this)
    ).subscribe(() => this.closeDrawer());

    
    this.subscription = this.chatService.currentMessage.subscribe(message => this.setArrange(message));
    this.conversationList$ = this.dataService.getAListOfAllConversationsForCurrrentUser();

    this.dataService.chatChangeStream.subscribe((hasUpdated: any) => {
      if (hasUpdated) {
        this.conversationList$ = this.dataService.getAListOfAllConversationsForCurrrentUser();
      }
    });
  }

  setArrange(id: number) {
    if(id > 0) 
    {      
      const topChat = chats.find(chat => chat.id === id );
      const templateChats = chats;
      let index = 0;
      const length = chats.length;
      for(let chat of chats)
      {
        index ++;
        if(chat.id == id)
        {
          break;
        }    
      }
      chats.splice(index-1, 1);
      chats.splice(0,0,topChat);      
    }
    
  }

  setStatus(status: OnlineStatus) {
    this.activeStatus = status;
    this.cd.markForCheck();
  }

  drawerChange(drawerOpen: boolean) {
    this.chatService.drawerOpen.next(drawerOpen);
  }

  openDrawer() {
    this.chatService.drawerOpen.next(true);
    this.cd.markForCheck();
  }

  closeDrawer() {
    this.chatService.drawerOpen.next(false);
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  }

  // markAsRead(conversation){
  //   console.log("read,,,,,,,,,,,", conversation);
  //   this.dataService.markAsConvesationAsRead(conversation.conversation_uuid).subscribe(response=>{
  //     conversation.IsReaded = true;

  //   });
  // }
}
