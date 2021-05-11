import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';


@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule
  ],
  exports: [ChartComponent]
})
export class ChartModule {
}
