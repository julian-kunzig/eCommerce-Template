import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfluencerSignUpComponent } from './influencersignup.component';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
    {
        path: '',
        component: InfluencerSignUpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfluencerSignUpRoutingModule {
}
