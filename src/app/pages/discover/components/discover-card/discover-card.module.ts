import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DiscoverCardComponent} from './discover-card.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [DiscoverCardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatRippleModule,
    MatTooltipModule,
  ],
  exports: [
      DiscoverCardComponent
  ]
})
export class DiscoverCardModule { }
