import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import {CampaignNewComponent} from './campaign-new.component';


const routes: VexRoutes = [
    {
        path: '',
        component: CampaignNewComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampaignNewRoutingModule {
}
