import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetQuickValueStartComponent } from './widget-quick-value-start.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { ShareBottomSheetModule } from '../../share-bottom-sheet/share-bottom-sheet.module';

@NgModule({
  declarations: [WidgetQuickValueStartComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    IconModule,
    MatTooltipModule,
    MatButtonModule,
    ShareBottomSheetModule
  ],
  exports: [WidgetQuickValueStartComponent]
})
export class WidgetQuickValueStartModule {
}

