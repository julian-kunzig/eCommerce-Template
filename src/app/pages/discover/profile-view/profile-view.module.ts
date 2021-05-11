import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from './profile-view.component';
import {ProfileViewRoutingModule} from './profile-view-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {ChartModule} from '../../../../@vex/components/chart/chart.module';
import {MatIconModule} from '@angular/material/icon';
import {IconModule} from '@visurel/iconify-angular';
import {WidgetQuickValueStartModule} from '../../../../@vex/components/widgets/widget-quick-value-start/widget-quick-value-start.module';
import {WidgetQuickValueCenterModule} from '../../../../@vex/components/widgets/widget-quick-value-center/widget-quick-value-center.module';
import {MatMenuModule} from '@angular/material/menu';
import {WidgetQuickLineChartModule} from '../../../../@vex/components/widgets/widget-quick-line-chart/widget-quick-line-chart.module';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [ProfileViewComponent],
  imports: [
    CommonModule,
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
    ProfileViewRoutingModule,
  ]
})
export class ProfileViewModule { }
