import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./discover-grid/discover-grid.module').then(
            (m) => m.DiscoverGridModule
          ),
      },
      {
        path: 'view/:id',
        loadChildren: () =>
          import('./profile-view/profile-view.module').then(
            (m) => m.ProfileViewModule
          ),
      },
      {
        path: 'checkout/:id',
        loadChildren: () =>
          import('./checkout-view/checkout-view.module').then(
            (m) => m.CheckoutViewModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverRoutingModule {}
