import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { CampaignEditComponent } from './campaign-edit.component';

const routes: VexRoutes = [
    {
        path: '',
        component: CampaignEditComponent,
        data: {
            toolbarShadowEnabled: false
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampaignEditRoutingModule {
}
