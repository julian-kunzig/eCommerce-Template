import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfluencerSignUpComponent } from './influencersignup.component';
import {InfluencerSignUpRoutingModule} from './influencersignup-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {IconModule} from '@visurel/iconify-angular';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

@NgModule({
  declarations: [InfluencerSignUpComponent],
  imports: [
    CommonModule,
    InfluencerSignUpRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    IconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    SlimLoadingBarModule.forRoot(),
    MatProgressBarModule
  ]
})
export class InfluencerSignUpModule { }
