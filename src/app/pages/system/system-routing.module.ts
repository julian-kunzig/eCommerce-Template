import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
    {
        path: '',
        children: [
            {
                path: 'disclosure',
                loadChildren: () => import('./disclosure/disclosure.module').then( m => m.DisclosureModule )
            },
        ],
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {}
