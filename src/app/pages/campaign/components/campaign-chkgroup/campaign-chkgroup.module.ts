import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { CampaignChkgroupComponent } from './campaign-chkgroup.component';

@NgModule({
  declarations: [CampaignChkgroupComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    FlexLayoutModule,
    MatIconModule,
    IconModule
  ],
  exports: [CampaignChkgroupComponent]
})
export class CampaignChkgroupModule { }
