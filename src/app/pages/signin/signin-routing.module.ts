import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin.component';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
    {
        path: '',
        component: SigninComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SigninRoutingModule {
}
