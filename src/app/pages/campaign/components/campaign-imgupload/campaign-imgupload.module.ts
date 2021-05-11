import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CampaignImguploadComponent } from './campaign-imgupload.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import {ImageCropperModule} from 'ngx-image-cropper';
@NgModule({
  declarations: [CampaignImguploadComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatIconModule,
    ImageCropperModule,
    IconModule,
    FlexLayoutModule
  ],
  exports: [CampaignImguploadComponent]
})
export class CampaignImguploadModule { }
