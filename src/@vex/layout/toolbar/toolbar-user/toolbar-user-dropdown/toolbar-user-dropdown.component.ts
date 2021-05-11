import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';
import { trackById } from '../../../../utils/track-by';
import icPerson from '@iconify/icons-ic/twotone-person';
import icSettings from '@iconify/icons-ic/twotone-settings';

import icHelp from '@iconify/icons-ic/twotone-help-outline';
import icTableChart from '@iconify/icons-ic/twotone-table-chart';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icDoNotDisturb from '@iconify/icons-ic/twotone-do-not-disturb';
import icOfflineBolt from '@iconify/icons-ic/twotone-offline-bolt';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import icBusiness from '@iconify/icons-ic/twotone-business';
import icVerifiedUser from '@iconify/icons-ic/twotone-verified-user';
import icLock from '@iconify/icons-ic/twotone-lock';
import icNotificationsOff from '@iconify/icons-ic/twotone-notifications-off';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icPhone from '@iconify/icons-ic/twotone-phone';

import { Icon } from '@visurel/iconify-angular';
import { PopoverRef } from '../../../../components/popover/popover-ref';
import { AuthenticationService } from 'src/app/providers/authentication.service';

export interface OnlineStatus {
  id: 'online' | 'away' | 'dnd' | 'offline';
  label: string;
  icon: Icon;
  colorClass: string;
}

@Component({
  selector: 'vex-toolbar-user-dropdown',
  templateUrl: './toolbar-user-dropdown.component.html',
  styleUrls: ['./toolbar-user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserDropdownComponent implements OnInit {

  items: MenuItem[] = [
    {
      id: '1',
      iconClass: 'icon-inf-settings',
      label: 'Settings',
      description: 'Settings',
      colorClass: 'text-white',
      route: 'panel/user/setting'
    },
    // {
    //   id: '1',
    //   iconClass: 'icon-inf-history',
    //   label: 'Report',
    //   description: 'Report',
    //   colorClass: 'text-white',
    //   route: 'panel/dashboard/report'
    // },
    {
      id: '3',
      iconClass: 'icon-inf-help',
      label: 'Common Q&A',
      description: 'Common Q&A',
      colorClass: 'text-white',
      route: 'faq'
    },
    {
      id: '4',
      iconClass: 'icon-inf-phone',
      label: 'Contact Us',
      description: 'Contact Us',
      colorClass: 'text-white',
      route: 'contactus'
    },
    {
      id: '4',
      iconClass: 'icon-inf-terms',
      label: 'Terms and Conditions /Disclosures',
      description: 'Terms and Conditions /Disclosures',
      colorClass: 'text-white',
      route: 'panel/system/disclosure'
    },
  ];

  statuses: OnlineStatus[] = [
    {
      id: 'online',
      label: 'Online',
      icon: icCheckCircle,
      colorClass: 'text-green'
    },
    {
      id: 'away',
      label: 'Away',
      icon: icAccessTime,
      colorClass: 'text-orange'
    },
    {
      id: 'dnd',
      label: 'Do not disturb',
      icon: icDoNotDisturb,
      colorClass: 'text-red'
    },
    {
      id: 'offline',
      label: 'Offline',
      icon: icOfflineBolt,
      colorClass: 'text-gray'
    }
  ];

  activeStatus: OnlineStatus = this.statuses[0];

  trackById = trackById;
  icPerson = icPerson;
  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icArrowDropDown = icArrowDropDown;
  icBusiness = icBusiness;
  icVerifiedUser = icVerifiedUser;
  icLock = icLock;
  icNotificationsOff = icNotificationsOff;

  constructor(private cd: ChangeDetectorRef,
              private popoverRef: PopoverRef<ToolbarUserDropdownComponent>,
              private authService: AuthenticationService
              ) { }

  ngOnInit() {
  }

  setStatus(status: OnlineStatus) {
    this.activeStatus = status;
    this.cd.markForCheck();
  }

  close() {
    this.popoverRef.close();
  }

  logout() {
    this.popoverRef.close();
    this.authService.logout();
  }
}
