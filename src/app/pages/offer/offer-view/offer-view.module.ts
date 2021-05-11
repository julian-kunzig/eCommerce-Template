import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferViewComponent } from './offer-view.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    component: OfferViewComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [OfferViewComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OfferViewModule { }
