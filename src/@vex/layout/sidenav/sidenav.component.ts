import { Component, Input, OnInit } from '@angular/core';
import { trackByRoute } from '../../utils/track-by';
import { NavigationService } from '../../services/navigation.service';
import icRadioButtonChecked from '@iconify/icons-ic/twotone-radio-button-checked';
import icRadioButtonUnchecked from '@iconify/icons-ic/twotone-radio-button-unchecked';
import { LayoutService } from '../../services/layout.service';
import { ConfigService } from '../../services/config.service';
import { map } from 'rxjs/operators';
import icMenu from '@iconify/icons-ic/twotone-menu';
import {UserService} from '../../../app/providers/user.service';

@Component({
  selector: 'vex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() collapsed: boolean;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(map(config => config.sidenav.imageUrl));
  mimageUrl$ = this.configService.config$.pipe(map(config => config.sidenav.mobileImageUrl));
  showCollapsePin$ = this.configService.config$.pipe(map(config => config.sidenav.showCollapsePin));
  showTitle$ = this.configService.config$.pipe(map(config => config.sidenav.showTitle));

  items = this.navigationService.items;
  trackByRoute = trackByRoute;
  icRadioButtonChecked = icRadioButtonChecked;
  icRadioButtonUnchecked = icRadioButtonUnchecked;
  icMenu = icMenu;

  constructor(private navigationService: NavigationService,
              private layoutService: LayoutService,
              public userService: UserService,
              private configService: ConfigService) { }

  ngOnInit() {
  }
  openSidenav() {
    this.layoutService.openSidenav();
  }
  onMouseEnter() {
    this.layoutService.collapseOpenSidenav();
  }

  onMouseLeave() {
    this.layoutService.collapseCloseSidenav();
  }
  checkMenuVisible(permissions: string[]){
    const visible = permissions.includes(this.userService.currentUser.type);
    return visible;
  }
  toggleSidenav(){
    const wrapper = document.querySelectorAll('.sidenav .mat-drawer-inner-container')[0];
    wrapper.classList.toggle('collapsed');
    const toolbarlogo = document.querySelectorAll('.toolbar-logo')[0];
    toolbarlogo.classList.toggle('show');
    const sidenavContent = document.querySelectorAll('.mat-drawer.sidenav:not(.mat-sidenav-fixed) ~ .sidenav-content')[0];
    sidenavContent.classList.toggle('sidenav-collapsed');
  }
  toggleCollapse() {
    this.collapsed ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
  }
}
