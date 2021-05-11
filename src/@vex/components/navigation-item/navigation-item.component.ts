import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem, NavigationLink } from '../../interfaces/navigation-item.interface';
import { filter, map, startWith } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { trackByRoute } from '../../utils/track-by';

@Component({
  selector: 'vex-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent implements OnInit {

  @Input() item: NavigationItem;

  isActive$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => (item: NavigationItem) => this.hasActiveChilds(item))
  );

  isLink = this.navigationService.isLink;
  isDropdown = this.navigationService.isDropdown;
  isSubheading = this.navigationService.isSubheading;
  trackByRoute = trackByRoute;

  constructor(private navigationService: NavigationService,
              private router: Router) { }

  ngOnInit() {
  }

  hasActiveChilds(parent: NavigationItem): boolean {
    if (this.isLink(parent)) {
      return this.router.isActive(parent.route as string, true);
    }

    if (this.isDropdown(parent) || this.isSubheading(parent)) {
      return parent.children.some(child => {
        if (this.isDropdown(child)) {
          return this.hasActiveChilds(child);
        }

        if (this.isLink(child) && !this.isFunction(child.route)) {
          return this.router.isActive(child.route as string, true);
        }

        return false;
      });
    }

    return false;
  }

  isFunction(prop: NavigationLink['route']) {
    return prop instanceof Function;
  }
}
