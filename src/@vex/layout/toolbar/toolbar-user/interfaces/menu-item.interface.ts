import { Icon } from '@visurel/iconify-angular';

export interface MenuItem {
  id: string;
  icon?: Icon;
  iconClass?: string;
  label: string;
  description: string;
  colorClass: string;
  route: string;
}
