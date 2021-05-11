import { Component, Input, OnInit } from '@angular/core';
import { Icon } from '@visurel/iconify-angular';
import icHelp from '@iconify/icons-ic/help-outline';
import icShare from '@iconify/icons-ic/twotone-share';
import icTrendingUp from '@iconify/icons-ic/twotone-trending-up';
import icTrendingDown from '@iconify/icons-ic/twotone-trending-down';
import { scaleInOutAnimation } from '../../../animations/scale-in-out.animation';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from '../../share-bottom-sheet/share-bottom-sheet.component';

@Component({
  selector: 'vex-widget-quick-value-start',
  templateUrl: './widget-quick-value-start.component.html',
  animations: [scaleInOutAnimation]
})
export class WidgetQuickValueStartComponent implements OnInit {

  @Input() iconClass: string;
  @Input() value: string;
  @Input() label: string;
  @Input() subLabel: string;
  @Input() change: number;
  @Input() changeSuffix: string;
  @Input() helpText: string;

  icTrendingUp = icTrendingUp;
  icTrendingDown = icTrendingDown;
  icHelp = icHelp;
  icShare = icShare;

  showButton: boolean;

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  openSheet() {
    this._bottomSheet.open(ShareBottomSheetComponent);
  }
}
