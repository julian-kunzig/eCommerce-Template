import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import {UserProfileRoutingModule} from './user-profile-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {IconModule} from '@visurel/iconify-angular';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import {MatExpansionModule} from '@angular/material/expansion';
import {CampaignChkgroupModule} from '../../campaign/components/campaign-chkgroup/campaign-chkgroup.module';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatInputModule,
    MatRadioModule,
    ContainerModule,
    IconModule,
    MatDatepickerModule,
    CampaignChkgroupModule,
    MatNativeDateModule,
  ]
})
export class UserProfileModule { }
