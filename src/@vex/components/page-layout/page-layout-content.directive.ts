import { Directive } from '@angular/core';

@Directive({
  selector: '[vexPageLayoutContent],vex-page-layout-content',
  host: {
    class: 'vex-page-layout-content'
  }
})
export class PageLayoutContentDirective {

  constructor() { }

}
