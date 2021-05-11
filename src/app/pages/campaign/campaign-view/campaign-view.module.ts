import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignViewComponent } from './campaign-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CampaignViewRoutingModule } from './campaign-view-routing.module';
@NgModule({
  declarations: [CampaignViewComponent],
  imports: [
    CommonModule,
    CampaignViewRoutingModule,
    FlexLayoutModule
  ]
})
export class CampaignViewModule { }
