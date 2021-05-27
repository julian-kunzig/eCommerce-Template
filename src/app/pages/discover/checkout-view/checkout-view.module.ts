import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { IconModule } from '@visurel/iconify-angular';
import { CheckoutViewRoutingModule } from './checkout-view-routing.module';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { ChartModule } from '../../../../@vex/components/chart/chart.module';
import { WidgetQuickValueStartModule } from '../../../../@vex/components/widgets/widget-quick-value-start/widget-quick-value-start.module';
import { WidgetQuickValueCenterModule } from '../../../../@vex/components/widgets/widget-quick-value-center/widget-quick-value-center.module';
import { WidgetQuickLineChartModule } from '../../../../@vex/components/widgets/widget-quick-line-chart/widget-quick-line-chart.module';

import { CheckoutViewComponent, CheckoutCardDialog } from './checkout-view.component';

@NgModule({
  declarations: [CheckoutViewComponent, CheckoutCardDialog],
  imports: [
    CommonModule,
    ContainerModule,
    ChartModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    IconModule,
    MatMenuModule,
    MatExpansionModule,
    WidgetQuickValueCenterModule,
    WidgetQuickLineChartModule,
    WidgetQuickValueStartModule,
    FlexLayoutModule,
    CheckoutViewRoutingModule,
  ],
})
export class CheckoutViewModule {}
