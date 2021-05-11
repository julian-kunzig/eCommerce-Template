import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OfferPackComponent} from './offer-pack.component';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {RouterModule} from '@angular/router';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {IconModule} from '@visurel/iconify-angular';
import {MatIconModule} from '@angular/material/icon';
import {CampaignCardModule} from '../../campaign/components/campaign-card/campaign-card.module';

const routes: VexRoutes = [
  {
    path: '',
    component: OfferPackComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [OfferPackComponent],
  imports: [
    CommonModule,
    ContainerModule,
    FlexLayoutModule,
    IconModule,
    MatIconModule,
    CampaignCardModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OfferPackModule { }
