import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OfferEditComponent} from './offer-edit.component';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {IconModule} from '@visurel/iconify-angular';


const routes: VexRoutes = [
  {
    path: '',
    component: OfferEditComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [OfferEditComponent],
  imports: [
    CommonModule,
    ContainerModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    IconModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OfferEditModule { }
