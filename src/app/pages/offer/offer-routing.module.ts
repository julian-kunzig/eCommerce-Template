import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';
const routes: VexRoutes = [
    {
        path: '',
        children: [
            {
                path: 'view/:id',
                loadChildren: () => import('./offer-view/offer-view.module').then(m => m.OfferViewModule)
            },
            {
                path: 'edit/:id',
                loadChildren: () => import('./offer-edit/offer-edit.module').then(m => m.OfferEditModule)
            },
            {
                path: 'pack/:id',
                loadChildren: () => import('./offer-pack/offer-pack.module').then(m => m.OfferPackModule)
            },
            {
                path: 'preview/:id',
                loadChildren: () => import('./offer-preview/offer-preview.module').then(m => m.OfferPreviewModule)
            },
            {
                path: 'progress/:id',
                loadChildren: () => import('./offer-progress/offer-progress.module').then(m => m.OfferProgressModule)
            },
            {
                path: 'list',
                loadChildren: () => import('./offer-list/offer-list.module').then( m => m.OfferListModule )
            },
        ],
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OfferRoutingModule{}
