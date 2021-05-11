import { DateTime } from 'luxon';
import { Icon } from '@visurel/iconify-angular';

export interface Notification {
  id: string;
  icon: Icon;
  label: string;
  colorClass: string;
  datetime: DateTime;
  read?: boolean;
}
