import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LayoutService } from '../services/layout.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Event, NavigationEnd, Router, Scroll } from '@angular/router';
import { filter, map, startWith, withLatestFrom } from 'rxjs/operators';
import { checkRouterChildsData } from '../utils/check-router-childs-data';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from '../services/config.service';

@UntilDestroy()
@Component({
  selector: 'vex-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  @Input() sidenavRef: TemplateRef<any>;
  @Input() toolbarRef: TemplateRef<any>;
  @Input() footerRef: TemplateRef<any>;
  @Input() quickpanelRef: TemplateRef<any>;

  isLayoutVertical$ = this.configService.config$.pipe(map(config => config.layout === 'vertical'));
  isBoxed$ = this.configService.config$.pipe(map(config => config.boxed));
  isToolbarFixed$ = this.configService.config$.pipe(map(config => config.toolbar.fixed));
  isFooterFixed$ = this.configService.config$.pipe(map(config => config.footer.fixed));
  isFooterVisible$ = this.configService.config$.pipe(map(config => config.footer.visible));
  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isDesktop$ = this.layoutService.isDesktop$;

  scrollDisabled$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.scrollDisabled))
  );

  containerEnabled$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.containerEnabled))
  );

  searchOpen$ = this.layoutService.searchOpen$;

  @ViewChild('quickpanel', { static: true }) quickpanel: MatSidenav;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  @ViewChild(MatSidenavContainer, { static: true }) sidenavContainer: MatSidenavContainer;

  constructor(private cd: ChangeDetectorRef,
              private breakpointObserver: BreakpointObserver,
              private layoutService: LayoutService,
              private configService: ConfigService,
              private router: Router,
              private elementRef: ElementRef,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    /**
     * Expand Sidenav when we switch from mobile to desktop view
     */
    this.isDesktop$.pipe(
      filter(matches => !matches),
      untilDestroyed(this)
    ).subscribe(() => this.layoutService.expandSidenav());

    /**
     * Open/Close Quickpanel through LayoutService
     */
    // this.layoutService.quickpanelOpen$.pipe(
    //   untilDestroyed(this)
    // ).subscribe(open => open ? this.quickpanel.open() : this.quickpanel.close());

    /**
     * Open/Close Sidenav through LayoutService
     */
    this.layoutService.sidenavOpen$.pipe(
      untilDestroyed(this)
    ).subscribe(open => open ? this.sidenav.open() : this.sidenav.close());

    /**
     * Mobile only:
     * Close Sidenav after Navigating somewhere (e.g. when a user clicks a link in the Sidenav)
     */
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      withLatestFrom(this.isDesktop$),
      filter(([event, matches]) => !matches),
      untilDestroyed(this)
    ).subscribe(() => this.sidenav.close());
  }
  onSticky(event) {
    if (event.target.scrollTop > 50) {
      const element = document.querySelector('.dashboard-wrapper .side-content');
      if (element) {
        element.classList.add('side-sticky');
        // element.setAttribute('style', 'top:' + event.target.scrollTop + 'px');
      }
    } else {
      const element = document.querySelector('.dashboard-wrapper .side-content');
      if (element) {
        element.classList.remove('side-sticky');
        element.setAttribute('style', 'top: 0px');
      }
    }
  }
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.querySelector('.sidenav-content')
         .addEventListener('scroll', this.onSticky.bind(this));
    /**
     * Enable Scrolling to specific parts of the page using the Router
     */
    this.router.events.pipe(
      filter<Event, Scroll>((e: Event): e is Scroll => e instanceof Scroll),
      untilDestroyed(this)
    ).subscribe(e => {
      if (e.position) {
        // backward navigation
        this.sidenavContainer.scrollable.scrollTo({
          start: e.position[0],
          top: e.position[1]
        });
      } else if (e.anchor) {
        // anchor navigation

        const scroll = (anchor: HTMLElement) => this.sidenavContainer.scrollable.scrollTo({
          behavior: 'smooth',
          top: anchor.offsetTop,
          left: anchor.offsetLeft
        });

        let anchorElem = this.document.getElementById(e.anchor);

        if (anchorElem) {
          scroll(anchorElem);
        } else {
          setTimeout(() => {
            anchorElem = this.document.getElementById(e.anchor);
            scroll(anchorElem);
          }, 100);
        }
      } else {
        // forward navigation
        this.sidenavContainer.scrollable.scrollTo({
          top: 0,
          start: 0
        });
      }
    });
  }
}
