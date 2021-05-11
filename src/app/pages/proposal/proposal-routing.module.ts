import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {VexRoutes} from '../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
    {
        path: '',
        children: [
            {
                path: 'view/:id',
                loadChildren: () => import('./proposal-view/proposal-view.module').then(m => m.ProposalViewModule)
            },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProposalRoutingModule{}
