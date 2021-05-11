import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Icon } from '@visurel/iconify-angular';
import faCaretUp from '@iconify/icons-fa-solid/caret-up';
import faCaretDown from '@iconify/icons-fa-solid/caret-down';
import icHelp from '@iconify/icons-ic/help-outline';
import icShare from '@iconify/icons-ic/twotone-share';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from '../../share-bottom-sheet/share-bottom-sheet.component';
import { scaleInOutAnimation } from '../../../animations/scale-in-out.animation';

@Component({
  selector: 'vex-widget-quick-value-center',
  templateUrl: './widget-quick-value-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [scaleInOutAnimation]
})
export class WidgetQuickValueCenterComponent implements OnInit {

  @Input() icon: Icon;
  @Input() value: string;
  @Input() label: string;
  @Input() change: number;
  @Input() helpText: string;
  @Input() iconClass: string;

  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
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
