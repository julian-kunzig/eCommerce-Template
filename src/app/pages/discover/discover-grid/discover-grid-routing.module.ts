import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { DiscoverGridComponent } from './discover-grid.component';

const routes: VexRoutes = [
    {
        path: '',
        component: DiscoverGridComponent,
        data: {
            scrollDisabled: false,
            toolbarShadowEnabled: false
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiscoverGridRoutingModule {
}
