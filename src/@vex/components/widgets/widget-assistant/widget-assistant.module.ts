import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetAssistantComponent } from './widget-assistant.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';


@NgModule({
  declarations: [WidgetAssistantComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IconModule
  ],
  exports: [WidgetAssistantComponent]
})
export class WidgetAssistantModule {
}
