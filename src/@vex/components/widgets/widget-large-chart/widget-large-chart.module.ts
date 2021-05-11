import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLargeChartComponent } from './widget-large-chart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartModule } from '../../chart/chart.module';


@NgModule({
  declarations: [WidgetLargeChartComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    IconModule,
    FlexLayoutModule,
    ChartModule
  ],
  exports: [WidgetLargeChartComponent]
})
export class WidgetLargeChartModule {
}
