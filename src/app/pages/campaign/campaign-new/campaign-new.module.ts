import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { NgxCurrencyModule } from 'ngx-currency';
import { IconModule } from '@visurel/iconify-angular';
import { MatExpansionModule } from '@angular/material/expansion';

import { CampaignNewComponent } from './campaign-new.component';
import { CampaignImguploadModule } from '../components/campaign-imgupload/campaign-imgupload.module';
import { CampaignChkgroupModule } from '../components/campaign-chkgroup/campaign-chkgroup.module';
import { CampaignQuestgroupModule } from '../components/campaign-questgroup/campaign-questgroup.module';
import { CampaignNewRoutingModule } from './campaign-new-routing.module';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const currencyConfig = {
  align: 'left',
  allowNegative: false,
  allowZero: false,
  decimal: '.',
  precision: 1,
  thousands: ',',
  prefix: '$',
  suffix: '',
  nullable: true
};

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

// @ts-ignore
@NgModule({
  declarations: [CampaignNewComponent],
  imports: [
    CommonModule,
    CampaignNewRoutingModule,
    CampaignImguploadModule,
    CampaignQuestgroupModule,
    FlexLayoutModule,
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
    NgxCurrencyModule.forRoot(currencyConfig),
    NgxMaskModule.forRoot(),
    MatDatepickerModule,
    CampaignChkgroupModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCheckboxModule,
    MatNativeDateModule,
    IconModule,
    Ng5SliderModule,
    MatSnackBarModule
  ]
})
export class CampaignNewModule { }
