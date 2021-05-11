import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { scaleFadeIn400ms } from '../../../../@vex/animations/scale-fade-in.animation';
import icMenu from '@iconify/icons-ic/twotone-menu';
import { ChatService } from '../chat.service';

@Component({
  selector: 'vex-chat-empty',
  templateUrl: './chat-empty.component.html',
  styleUrls: ['./chat-empty.component.scss'],
  animations: [scaleFadeIn400ms]
})
export class ChatEmptyComponent implements OnInit {

  icMenu = icMenu;

  constructor(private chatService: ChatService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  openDrawer() {
    this.chatService.drawerOpen.next(true);
    this.cd.markForCheck();
  }

  closeDrawer() {
    this.chatService.drawerOpen.next(false);
    this.cd.markForCheck();
  }

}
