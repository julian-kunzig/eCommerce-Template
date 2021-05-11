import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ApexOptions } from '../../chart/chart.component';
import { defaultChartOptions } from '../../../utils/default-chart-options';
import { Icon } from '@visurel/iconify-angular';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from '../../share-bottom-sheet/share-bottom-sheet.component';
import icShare from '@iconify/icons-ic/twotone-share';
import { scaleInOutAnimation } from '../../../animations/scale-in-out.animation';

@Component({
  selector: 'vex-widget-quick-line-chart',
  templateUrl: './widget-quick-line-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [scaleInOutAnimation]
})
export class WidgetQuickLineChartComponent implements OnInit {

  @Input() icon: Icon;
  @Input() value: string;
  @Input() label: string;
  @Input() iconClass: string;
  @Input() options: ApexOptions = defaultChartOptions({
    chart: {
      type: 'area',
      height: 100
    }
  });
  @Input() series: ApexNonAxisChartSeries | ApexAxisChartSeries;

  showButton: boolean;

  icShare = icShare;

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  openSheet() {
    this._bottomSheet.open(ShareBottomSheetComponent);
  }
}

