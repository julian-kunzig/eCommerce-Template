import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripHtmlPipe } from './strip-html.pipe';


@NgModule({
  declarations: [StripHtmlPipe],
  imports: [
    CommonModule
  ],
  exports: [StripHtmlPipe]
})
export class StripHtmlModule {
}
