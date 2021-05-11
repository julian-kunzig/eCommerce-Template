import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTokensPipe } from './date-tokens.pipe';


@NgModule({
  declarations: [DateTokensPipe],
  exports: [
    DateTokensPipe
  ],
  imports: [
    CommonModule
  ],
})
export class DateTokensModule {
}
