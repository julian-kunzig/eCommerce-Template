import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CampaignCardModule} from '../../../campaign/components/campaign-card/campaign-card.module';
import { OfferCardComponent } from './offer-card.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContainerModule} from '../../../../../@vex/directives/container/container.module';

@NgModule({
  declarations: [OfferCardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ContainerModule,
    CampaignCardModule
  ],
  exports: [OfferCardComponent]
})
export class OfferCardModule { }
