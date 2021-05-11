import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProposalViewComponent} from './proposal-view.component';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';

const routes: VexRoutes = [
  {
    path: '',
    component: ProposalViewComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [ProposalViewComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProposalViewModule { }
