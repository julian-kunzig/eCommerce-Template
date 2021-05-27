import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { CheckoutViewComponent } from './checkout-view.component';

const routes: VexRoutes = [
  {
    path: '',
    component: CheckoutViewComponent,
    data: {
      scrollDisabled: false,
      toolbarShadowEnabled: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})
export class CheckoutViewRoutingModule {}
