import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigPanelComponent } from './config-panel.component';
import { ConfigPanelToggleComponent } from './config-panel-toggle/config-panel-toggle.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    MatRadioModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatRippleModule
  ],
  declarations: [ConfigPanelComponent, ConfigPanelToggleComponent],
  exports: [ConfigPanelComponent, ConfigPanelToggleComponent]
})
export class ConfigPanelModule {
}
