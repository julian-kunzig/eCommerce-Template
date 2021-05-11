import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {

  transform(html: string): string {
    return html?.replace(/<[^>]*>?/gm, '');
  }

}
