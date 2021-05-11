import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingComponent } from './user-setting.component';
import {UserSettingRoutingModule} from './user-setting-routing.module';
import {MatRippleModule} from '@angular/material/core';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [UserSettingComponent],
  imports: [
    CommonModule,
    UserSettingRoutingModule,
    ImageCropperModule,
    MatRippleModule,
  ]
})
export class UserSettingModule { }
