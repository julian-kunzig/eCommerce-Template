import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
    {
        path: '',
        children: [
            {
                path: 'home',
                loadChildren: () => import('./dashboard-home/dashboard-home.module').then( m => m.DashboardHomeModule )
            },
            {
                path: 'report',
                loadChildren: () => import('./dashboard-report/dashboard-report.module').then( m => m.DashboardReportModule )
            },
        ],
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
