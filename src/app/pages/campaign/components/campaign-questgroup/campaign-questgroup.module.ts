import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CampaignQuestgroupComponent } from './campaign-questgroup.component';

@NgModule({
  declarations: [CampaignQuestgroupComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    FlexLayoutModule,
    MatCheckboxModule
  ],
  exports: [CampaignQuestgroupComponent]
})
export class CampaignQuestgroupModule { }
