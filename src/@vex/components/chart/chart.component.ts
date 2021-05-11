import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { asapScheduler } from 'rxjs';
// @ts-ignore
import ApexCharts from 'apexcharts';

export interface ApexOptions {
  annotations?: ApexAnnotations;
  chart?: ApexChart;
  colors?: any[];
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  grid?: ApexGrid;
  labels?: string[] | number[];
  legend?: ApexLegend;
  markers?: ApexMarkers;
  noData?: ApexNoData;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  states?: ApexStates;
  stroke?: ApexStroke;
  subtitle?: ApexTitleSubtitle;
  theme?: ApexTheme;
  title?: ApexTitleSubtitle;
  tooltip?: ApexTooltip;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
}

@Component({
  selector: 'vex-chart',
  template: `
    <div #chart></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() options: ApexOptions;
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  @Input() autoUpdateSeries = true;
  public chart: ApexCharts;
  @ViewChild('chart', { static: true }) private chartElement: ElementRef;

  constructor(private cd: ChangeDetectorRef,
              private ngZone: NgZone) {}


  ngOnInit() {
    asapScheduler.schedule(() => {
      this._createElement();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    asapScheduler.schedule(() => {
      if (this.autoUpdateSeries && Object.keys(changes).filter(c => c !== 'series').length === 0) {
        this.chart.updateSeries(this.series, true);
        return;
      }

      this._createElement();
    });
  }

  public render(): Promise<void> {
    return this.chart.render();
  }

  private _createElement() {
    if (this.series) {
      this.options.series = this.series;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.ngZone.runOutsideAngular(() => {
      this.chart = new ApexCharts(
        this.chartElement.nativeElement,
        this.options
      );

      this.render();
    });
  }
}
