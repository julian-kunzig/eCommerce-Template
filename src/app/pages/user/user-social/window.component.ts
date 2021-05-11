
import {Component, ViewChild, OnInit, ComponentFactoryResolver, ApplicationRef, Injector, OnDestroy } from '@angular/core';
import {CdkPortal, DomPortalOutlet} from '@angular/cdk/portal';

/**
 * This component template wrap the projected content
 * with a 'cdkPortal'.
 */

@Component({
  selector: 'window',
  template: `
    <ng-container *cdkPortal>
      <ng-content></ng-content>
    </ng-container>
  `
})
export class WindowComponent implements OnInit, OnDestroy {

  // STEP 1: get a reference to the portal
  @ViewChild(CdkPortal) portal: CdkPortal;

  // STEP 2: save a reference to the window so we can close it
  private externalWindow = null;

  // STEP 3: Inject all the required dependencies for a PortalHost
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector){

    }


  ngOnInit(){
    // STEP 4: create an external window
    console.log('init');
    this.externalWindow = window.open('https://instagram.com', '', 'width=600,height=400,left=200,top=200');

    // STEP 5: create a PortalHost with the body of the new window document    
    const host = new DomPortalOutlet(
      this.externalWindow.document.body,
      this.componentFactoryResolver,
      this.applicationRef,
      this.injector
      );

    // STEP 6: Attach the portal
    host.attach(this.portal);
  }

  ngOnDestroy(){
    // STEP 7: close the window when this component destroyed
    this.externalWindow.close()
  }
}