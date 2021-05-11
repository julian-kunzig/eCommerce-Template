import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CampaignViewComponent } from './campaign-view.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
    {
        path: '',
        component: CampaignViewComponent,
        data: {
            toolbarShadowEnabled: false
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampaignViewRoutingModule {
}
