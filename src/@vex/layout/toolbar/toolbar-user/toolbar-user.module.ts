import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarUserComponent } from './toolbar-user.component';
import { ToolbarUserDropdownComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RelativeDateTimeModule } from '../../../pipes/relative-date-time/relative-date-time.module';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';


@NgModule({
  declarations: [ToolbarUserComponent, ToolbarUserDropdownComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    RelativeDateTimeModule,
    RouterModule,
    MatTooltipModule,
    IconModule
  ],
  exports: [ToolbarUserComponent],
  entryComponents: [ToolbarUserDropdownComponent]
})
export class ToolbarUserModule {
}

