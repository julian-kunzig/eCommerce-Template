import { Component, Input, OnInit } from '@angular/core';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icCloudDownload from '@iconify/icons-ic/twotone-cloud-download';
import faCaretUp from '@iconify/icons-fa-solid/caret-up';
import faCaretDown from '@iconify/icons-fa-solid/caret-down';
import { ApexOptions } from '../../chart/chart.component';
import { defaultChartOptions } from '../../../utils/default-chart-options';
import { createDateArray } from '../../../utils/create-date-array';

@Component({
  selector: 'vex-widget-large-goal-chart',
  templateUrl: './widget-large-goal-chart.component.html'
})
export class WidgetLargeGoalChartComponent implements OnInit {

  @Input() total: number;
  @Input() series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  @Input() options: ApexOptions = defaultChartOptions({
    grid: {
      show: true,
      strokeDashArray: 3,
      padding: {
        left: 16
      }
    },
    chart: {
      type: 'line',
      height: 300,
      sparkline: {
        enabled: false
      },
      zoom: {
        enabled: false
      }
    },
    stroke: {
      width: 4
    },
    labels: createDateArray(12),
    xaxis: {
      type: 'datetime',
      labels: {
        show: true
      }
    },
    yaxis: {
      labels: {
        show: true
      }
    }
  });

  icMoreHoriz = icMoreHoriz;
  icCloudDownload = icCloudDownload;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;

  constructor() { }

  ngOnInit() {
  }

}
