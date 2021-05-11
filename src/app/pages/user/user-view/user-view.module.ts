import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReviewDialogComponent, UserViewComponent} from './user-view.component';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {RouterModule} from '@angular/router';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {ChartModule} from '../../../../@vex/components/chart/chart.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {IconModule} from '@visurel/iconify-angular';
import {MatMenuModule} from '@angular/material/menu';
import {WidgetQuickValueCenterModule} from '../../../../@vex/components/widgets/widget-quick-value-center/widget-quick-value-center.module';
import {WidgetQuickLineChartModule} from '../../../../@vex/components/widgets/widget-quick-line-chart/widget-quick-line-chart.module';
import {WidgetQuickValueStartModule} from '../../../../@vex/components/widgets/widget-quick-value-start/widget-quick-value-start.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CampaignCardModule} from '../../campaign/components/campaign-card/campaign-card.module';

const routes: VexRoutes = [
  {
    path: '',
    component: UserViewComponent,
    data: {
      scrollDisabled: false,
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [UserViewComponent, ReviewDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContainerModule,
    ChartModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    IconModule,
    MatMenuModule,
    WidgetQuickValueCenterModule,
    WidgetQuickLineChartModule,
    WidgetQuickValueStartModule,
    FlexLayoutModule,
    CampaignCardModule
  ],
  exports: [RouterModule]
})
export class UserViewModule { }
