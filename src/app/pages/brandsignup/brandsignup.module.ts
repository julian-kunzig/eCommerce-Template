import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandSignUpComponent } from '../brandsignup/brandsignup.component';
import {BrandSignUpRoutingModule} from './brandsignup-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {IconModule} from '@visurel/iconify-angular';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

// import { ProgressBarModule } from '../../../../v /components/progress-bar/progress-bar.module';

import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [BrandSignUpComponent],
  imports: [
    CommonModule,
    BrandSignUpRoutingModule,
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
export class BrandSignUpModule { }
