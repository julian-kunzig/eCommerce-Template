import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { TemplateRef, Type } from '@angular/core';

export interface PopoverCloseEvent<T = any> {
  type: 'backdropClick' | 'close';
  data: T;
}

export type PopoverContent = TemplateRef<any> | Type<any> | string;

export class PopoverRef<T = any> {
  private afterClosed = new Subject<PopoverCloseEvent<T>>();
  afterClosed$ = this.afterClosed.asObservable();

  constructor(public overlay: OverlayRef,
              public content: PopoverContent,
              public data: T) {
    overlay.backdropClick().subscribe(() => {
      this._close('backdropClick', null);
    });
  }

  close(data?: T) {
    this._close('close', data);
  }

  private _close(type: PopoverCloseEvent['type'], data?: T) {
    this.overlay.dispose();
    this.afterClosed.next({
      type,
      data
    });
    this.afterClosed.complete();
  }
}
