import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignCardComponent } from './campaign-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import {SaveListDialogComponent} from '../../../discover/discover-grid/discover-grid.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {IconModule} from '@visurel/iconify-angular';

@NgModule({
  declarations: [CampaignCardComponent, SaveListDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    IconModule,
    MatMenuModule,
    MatRippleModule,
    MatTooltipModule
  ],
  exports: [CampaignCardComponent]
})
export class CampaignCardModule { }
