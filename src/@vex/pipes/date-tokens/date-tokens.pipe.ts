import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateTokens'
})
export class DateTokensPipe implements PipeTransform {

  transform(value: DateTime | null, ...args: string[]): any {
    if (!args[0]) {
      throw new Error('[DateTokensPipe]: No args defined, please define your format.');
    }

    return value ? value.toFormat(args[0]) : '';
  }

}
