import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import {UserProfileComponent} from './user-profile.component';

const routes: VexRoutes = [
    {
        path: '',
        component: UserProfileComponent,
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
export class UserProfileRoutingModule {}
