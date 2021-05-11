import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverService } from '../../../components/popover/popover.service';
import { ToolbarNotificationsDropdownComponent } from './toolbar-notifications-dropdown/toolbar-notifications-dropdown.component';
import icNotificationsActive from '@iconify/icons-ic/twotone-notifications-active';
import { DataService } from 'src/app/providers/data.service';

@Component({
  selector: 'vex-toolbar-notifications',
  templateUrl: './toolbar-notifications.component.html',
  styleUrls: ['./toolbar-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarNotificationsComponent implements OnInit {

  @ViewChild('originRef', { static: true, read: ElementRef }) originRef: ElementRef;
  @Input() notifications = [];

  dropdownOpen: boolean;
  icNotificationsActive = icNotificationsActive;

  constructor(private popover: PopoverService,
              private cd: ChangeDetectorRef,
              private dataService: DataService) {}

  ngOnInit() {}

  showPopover() {
    this.dropdownOpen = true;
    this.cd.markForCheck();
    const notifs = this.notifications.filter(item => !item.read).map(item => item.notification_uuid);
    this.dataService.setMarkAsRead(notifs);
    const popoverRef = this.popover.open({
      content: ToolbarNotificationsDropdownComponent,
      origin: this.originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
