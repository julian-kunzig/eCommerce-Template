import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardReportComponent} from './dashboard-report.component';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {RouterModule} from '@angular/router';
import {CampaignQuestgroupModule} from '../../campaign/components/campaign-questgroup/campaign-questgroup.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

const routes: VexRoutes = [
  {
    path: '',
    component: DashboardReportComponent,
    data: {
      scrollDisabled: false,
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [DashboardReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CampaignQuestgroupModule,
    FlexLayoutModule,
    ContainerModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [RouterModule]
})
export class DashboardReportModule { }
