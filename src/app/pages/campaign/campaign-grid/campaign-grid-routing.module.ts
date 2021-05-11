import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CampaignGridComponent } from './campaign-grid.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
    {
        path: '',
        component: CampaignGridComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: false
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampaignGridRoutingModule {
}
