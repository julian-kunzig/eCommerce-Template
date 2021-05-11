import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickpanelComponent } from './quickpanel.component';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [QuickpanelComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatProgressBarModule,
    RouterModule,
    MatRippleModule
  ],
  exports: [QuickpanelComponent]
})
export class QuickpanelModule {
}
