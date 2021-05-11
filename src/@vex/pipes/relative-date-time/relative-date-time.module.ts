import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelativeDateTimePipe } from './relative-date-time.pipe';


@NgModule({
  declarations: [RelativeDateTimePipe],
  imports: [
    CommonModule
  ],
  exports: [RelativeDateTimePipe]
})
export class RelativeDateTimeModule {
}
