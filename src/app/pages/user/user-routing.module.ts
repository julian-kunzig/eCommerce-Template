import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
    {
        path: '',
        children: [
            {
                path: 'setting',
                loadChildren: () => import('./user-setting/user-setting.module').then( m => m.UserSettingModule )
            },
            {
                path: 'profile',
                loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfileModule )
            },
            {
                path: 'view',
                loadChildren: () => import('./user-view/user-view.module').then( m => m.UserViewModule )
            },
            {
                path: 'social',
                loadChildren: () => import('./user-social/user-social.module').then( m => m.UserSocialModule )
            },
        ],
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
