import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclosureComponent } from './disclosure.component';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {MatIconModule} from '@angular/material/icon';
import {IconModule} from '@visurel/iconify-angular';
import {PdfViewerModule} from 'ng2-pdf-viewer';

const routes: VexRoutes = [
  {
    path: '',
    component: DisclosureComponent,
    data: {
      scrollDisabled: false,
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [DisclosureComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    ContainerModule,
    MatIconModule,
    IconModule,
    PdfViewerModule,
  ]
})
export class DisclosureModule { }
