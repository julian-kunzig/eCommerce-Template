import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timeSince'
})
export class TimeSincePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const date = new Date(value);
    const timeSinceInSeconds: any = Math.floor(((+new Date()) - (+date)) / 1000);

    let timeSince = Math.floor(timeSinceInSeconds / 2592000);
    if (timeSince > 1) { // if greater than a month, just show full date
      const datePipe = new DatePipe("en-US");
      let dateFormatted = datePipe.transform(date, 'MMM d, y');

      return dateFormatted;
    }
    timeSince = Math.floor(timeSinceInSeconds / 86400);
    if (timeSince > 1) {
      return timeSince + ' d ago';
    }
    timeSince = Math.floor(timeSinceInSeconds / 3600);
    if (timeSince > 1) {
      return timeSince + ' h ago';
    }
    timeSince = Math.floor(timeSinceInSeconds / 60);
    if (timeSince > 1) {
      return timeSince + ' min ago';
    }
    return Math.floor(timeSinceInSeconds) + ' s ago';
  }

}
