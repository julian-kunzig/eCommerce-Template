import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferProgressComponent } from './offer-progress.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {IconModule} from '@visurel/iconify-angular';
import {MatTabsModule} from '@angular/material/tabs';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {RouterModule} from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CampaignImguploadModule} from '../../campaign/components/campaign-imgupload/campaign-imgupload.module';
import {MatChipsModule} from '@angular/material/chips';

const routes: VexRoutes = [
  {
    path: '',
    component: OfferProgressComponent,
    data: {
      scrollDisabled: false,
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [OfferProgressComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    ContainerModule,
    MatStepperModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatExpansionModule,
    IconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CampaignImguploadModule,
    MatChipsModule,
  ]
})
export class OfferProgressModule { }
