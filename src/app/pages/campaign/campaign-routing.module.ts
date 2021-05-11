import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                loadChildren: () => import('./campaign-grid/campaign-grid.module').then(m => m.CampaignGridModule)
            },
            {
                path: 'new',
                loadChildren: () => import('./campaign-new/campaign-new.module').then(m => m.CampaignNewModule)
            },
            {
                path: 'edit/:id',
                loadChildren: () => import('./campaign-edit/campaign-edit.module').then(m => m.CampaignEditModule)
            },
            {
                path: 'view/:id',
                loadChildren: () => import('./campaign-view/campaign-view.module').then(m => m.CampaignViewModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampaignRoutingModule {
}
