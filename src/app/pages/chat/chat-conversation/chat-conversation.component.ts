import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Chat, ChatComponent, ChatMessage } from '../chat.component';
import { chatMessages } from '../../../../static-data/chat-messages';
import { trackById } from '../../../../@vex/utils/track-by';
import { chats } from '../../../../static-data/chats';
import { delay, map } from 'rxjs/operators';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import { fadeInUp400ms, } from '../../../../@vex/animations/fade-in-up.animation';
import { FormControl, FormGroup } from '@angular/forms';
import { stagger20ms } from '../../../../@vex/animations/stagger.animation';
import { ScrollbarComponent } from '../../../../@vex/components/scrollbar/scrollbar.component';
import { ChatService } from '../chat.service';
import icMenu from '@iconify/icons-ic/twotone-menu';
import {CampaignService, Offer, Proposal} from '../../../providers/campaign.service';
import {Campaign} from '../../campaign/interfaces/campaign.interface';
import {UserService} from '../../../providers/user.service';
import { Observable, of, Subscription } from 'rxjs';
import { DataService } from 'src/app/providers/data.service';



@UntilDestroy()
@Component({
  selector: 'vex-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms,
    stagger20ms
  ]
})
export class ChatConversationComponent implements OnInit, OnDestroy {

  chat: Chat;
  messages: ChatMessage[];
  msgs: any[]=[];

  form = new FormGroup({
    message: new FormControl()
  });

  arrangID:Number;
  subscription: Subscription;
  
  enableOffer = false;
  editId: number;
  icCheckCircle = icCheckCircle;
  icMoreVert = icMoreVert;
  icMenu = icMenu;
  trackById = trackById;
  status:boolean = false;
  @ViewChild(ScrollbarComponent, { static: true }) scrollbar: ScrollbarComponent;
  constructor(private route: ActivatedRoute,
              private chatService: ChatService,
              public campService: CampaignService,
              public userService: UserService,
              public dataService: DataService,
              private router: Router,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.paramMap.pipe(
        map(paramMap => +paramMap.get('chatId')),
        untilDestroyed(this)
    ).subscribe(chatId => {
      this.messages = [];
      this.cd.detectChanges();
      this.chat = chats.find(chat => chat.id == this.route.snapshot.paramMap.get('chatId'));


      this.getAllMessagesForCurrentConversation(this.route.snapshot.paramMap.get('chatId'));

      // this.chat.unreadCount = 0;
      this.filterMessages(chatId);
      this.proposals(chatId);
      this.pendingOffers(chatId);
      this.cd.detectChanges();
      this.scrollToBottom();
      
    });
    this.subscription = this.chatService.currentMessage.subscribe(message => this.arrangID = message)
  }
  getAllMessagesForCurrentConversation(conversationId: string) {
     this.dataService.getAllMessagesForAGivenConversation(conversationId).subscribe(response=>{
      this.msgs = response['results'];
      this.msgs.sort((a, b) => {
        if (a.sent_at < b.sent_at)
          return -1;
        if (a.sent_at > b.sent_at)
          return 1;
        return 0;
      })
      this.cd.detectChanges();
      this.scrollToBottom();
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  proposals(chatId){
    const prs = this.campService.proposals.filter(o => {
      return o.status === 'pending' && o.userId === chatId;
    });

    prs.forEach(p => {
      p.status = 'sent';
      this.chatService.messages.push({
        id: this.chat.id,
        from: 'me',
        type: 'proposal',
        message: 'You sent a proposal.',
        proposal: p,
      });
      this.messages.push({
        id: this.chat.id,
        from: 'me',
        type: 'proposal',
        message: 'You sent a proposal.',
        proposal: p,
      });
    });
  }
  viewProposal(id?: Proposal['id']){
    const r = this.router.navigate(['panel/proposal/view/' + id]);
  }
  campaign(id?: Campaign['id']): Campaign {
    const cp = this.campService.campList.filter(c => c.id === id)[0];
    return cp;
  }
  pendingOffers(chatId: ChatMessage['id']) {
    const pendingOffers = this.campService.offers.filter(o => {
      return o.status === 'pending' && o.chatId === chatId;
    });
    pendingOffers.forEach(p => {
      p.status = 'active';
      this.chatService.messages.push({
        id: this.chat.id,
        from: 'me',
        type: 'offer',
        message: 'You sent a campaign.',
        offer: p,
      });
      this.messages.push({
        id: this.chat.id,
        from: 'me',
        type: 'offer',
        message: 'You sent a campaign.',
        offer: p,
      });
    });

    const declinedOffers = this.campService.offers.filter(o => {
      return o.status === 'declined' && o.chatId === chatId;
    });
    if (declinedOffers.length > 0) {
      this.enableOffer = true;
      this.editId = declinedOffers[0].id;
    }else{
      this.enableOffer = false;
    }

    const editableOffers = this.campService.offers.filter(o => {
      return o.editable && o.chatId === chatId;
    });

    if (editableOffers.length > 0 && this.userService.currentUser.type === 'advertiser') {
      this.enableOffer = true;
      this.editId = editableOffers[0].id;
    }
  }
  editOffer(){
    const r = this.router.navigate(['panel/offer/edit/' + this.editId]);
  }
  disableEditOffer(){
    this.enableOffer = false;
  }
  openOffer(id?: Offer['id']) {
    const r = this.router.navigate(['panel/offer/view/' + id]);
  }
  filterMessages(id: ChatMessage['id']) {
    this.messages = this.chatService.messages.filter(message => message.id === id);
  }

  send() {
    // this.messages.push({
    //   id: this.chat.id,
    //   from: 'me',
    //   type: 'message',
    //   message: this.form.get('message').value
    // });    
    // this.chatService.changeMessage(this.chat.id);
    // this.form.get('message').setValue('');

    const conversation_id = this.route.snapshot.paramMap.get('chatId');
    let msg = this.form.get('message').value;
    this.dataService.sendAMessageToAConversation(conversation_id, msg).subscribe(rep =>{
      this.getAllMessagesForCurrentConversation(conversation_id);
      this.form.get('message').setValue('');
    });
    
    // this.cd.detectChanges();
    // this.scrollToBottom();
  }

  scrollToBottom() {
    this.scrollbar.scrollbarRef.getScrollElement().scrollTo({
      behavior: 'smooth',
      top: this.scrollbar.scrollbarRef.getContentElement().clientHeight
    });
  }

  openDrawer() {
    this.chatService.drawerOpen.next(true);
    this.cd.markForCheck();
  }

  closeDrawer() {
    this.chatService.drawerOpen.next(false);
    this.cd.markForCheck();
  }
  sendCampaign(){
    const r = this.router.navigate(['panel/offer/pack/' + this.chat.id]);
  }
  sortByDate(a,b) {
    if (a.sent_at < b.sent_at)
      return -1;
    if (a.sent_at > b.sent_at)
      return 1;
    return 0;
  }
}
