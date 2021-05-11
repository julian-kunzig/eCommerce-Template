import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import {ProfileViewComponent} from './profile-view.component';

const routes: VexRoutes = [
    {
        path: '',
        component: ProfileViewComponent,
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
export class ProfileViewRoutingModule {
}
