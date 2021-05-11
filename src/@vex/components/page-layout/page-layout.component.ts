import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vex-page-layout',
  template: '<ng-content></ng-content>',
  host: {
    class: 'vex-page-layout'
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent {

  @Input() mode: 'card' | 'simple' = 'simple';

  constructor() { }

  @HostBinding('class.vex-page-layout-card')
  get isCard() {
    return this.mode === 'card';
  }

  @HostBinding('class.vex-page-layout-simple')
  get isSimple() {
    return this.mode === 'simple';
  }

}
