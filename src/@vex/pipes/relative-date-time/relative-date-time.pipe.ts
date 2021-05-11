import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'relativeDateTime'
})
export class RelativeDateTimePipe implements PipeTransform {

  transform(value: DateTime | null | string, ...args: any[]): any {
    if (!value) {
      return;
    }

    if (!(value instanceof DateTime)) {
      value = DateTime.fromISO(value);
    }

    return value.toRelative();
  }

}
