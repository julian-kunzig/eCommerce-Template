import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandSignUpComponent } from './brandsignup.component';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
    {
        path: '',
        component: BrandSignUpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrandSignUpRoutingModule {
}
