import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {IconModule} from '@visurel/iconify-angular';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {OfferListComponent} from './offer-list.component';
import {RouterModule} from '@angular/router';
import {ScrollbarModule} from '../../../../@vex/components/scrollbar/scrollbar.module';

const routes: VexRoutes = [
  {
    path: '',
    component: OfferListComponent,
    data: {
      scrollDisabled: false,
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [OfferListComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContainerModule,
    IconModule,
    FlexLayoutModule,
    ScrollbarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ]
})
export class OfferListModule { }
