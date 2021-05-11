import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OfferPreviewComponent} from './offer-preview.component';
import {RouterModule} from '@angular/router';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: VexRoutes = [
  {
    path: '',
    component: OfferPreviewComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [OfferPreviewComponent],
  imports: [
    CommonModule,
    ContainerModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OfferPreviewModule { }
