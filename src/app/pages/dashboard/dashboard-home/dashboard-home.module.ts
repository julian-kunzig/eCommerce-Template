import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardHomeComponent} from './dashboard-home.component';
import {NgxUsefulSwiperModule} from 'ngx-useful-swiper';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    component: DashboardHomeComponent,
    data: {
      scrollDisabled: false,
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    CommonModule,
    NgxUsefulSwiperModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    ContainerModule,
  ],
  exports: [RouterModule]
})
export class DashboardHomeModule { }
