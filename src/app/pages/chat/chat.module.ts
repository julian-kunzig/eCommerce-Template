import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import { ChatEmptyComponent } from './chat-empty/chat-empty.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import {ChatRoutingModule} from './chat-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {IconModule} from '@visurel/iconify-angular';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import {ScrollbarModule} from '../../../@vex/components/scrollbar/scrollbar.module';
import {OfferCardModule} from '../offer/components/offer-card/offer-card.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {TimeSincePipe} from '../../helpers/time-since.pipe';

@NgModule({
  declarations: [
    ChatComponent, 
    ChatEmptyComponent, 
    ChatConversationComponent,
    TimeSincePipe
  ],
  imports: [
    CommonModule,
    OfferCardModule,
    ChatRoutingModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatBadgeModule,
    IconModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatMenuModule,
    ScrollbarModule
  ],
  // providers: [
  //   TimeSincePipe
  // ]
})
export class ChatModule { }
