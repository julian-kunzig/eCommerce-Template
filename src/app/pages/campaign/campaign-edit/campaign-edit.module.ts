import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignEditComponent } from './campaign-edit.component';
import { CampaignEditRoutingModule } from './campaign-edit-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { CampaignChkgroupModule } from '../components/campaign-chkgroup/campaign-chkgroup.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {IconModule} from '@visurel/iconify-angular';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CampaignQuestgroupModule } from '../components/campaign-questgroup/campaign-questgroup.module';
import { CampaignImguploadModule } from '../components/campaign-imgupload/campaign-imgupload.module';
import { Ng5SliderModule } from 'ng5-slider';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [CampaignEditComponent],
  imports: [
    CommonModule,
    ContainerModule,
    CampaignEditRoutingModule,
    ImageCropperModule,
    MatTabsModule,
    FlexLayoutModule,
    FormsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    CampaignImguploadModule,
    MatCheckboxModule,
    MatRadioModule,
    IconModule,
    Ng5SliderModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    CampaignChkgroupModule,
    CampaignQuestgroupModule,
  ]
})
export class CampaignEditModule { }
