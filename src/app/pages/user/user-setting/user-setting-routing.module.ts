import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import {UserSettingComponent} from './user-setting.component';

const routes: VexRoutes = [
    {
        path: '',
        component: UserSettingComponent,
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
export class UserSettingRoutingModule {}
