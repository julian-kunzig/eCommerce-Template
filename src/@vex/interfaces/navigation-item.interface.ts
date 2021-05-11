import { Icon } from '@visurel/iconify-angular';

export type NavigationItem = NavigationLink | NavigationDropdown | NavigationSubheading;

export interface NavigationLink {
  type: 'link';
  route: string | any;
  fragment?: string;
  label: string;
  icon?: Icon;
  iconClass?: string;
  routerLinkActiveOptions?: { exact: boolean };
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
  params?: {};
  permission: string[];
}

export interface NavigationDropdown {
  type: 'dropdown';
  label: string;
  icon?: Icon;
  iconClass?: string;
  children: Array<NavigationLink | NavigationDropdown>;
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
}

export interface NavigationSubheading {
  type: 'subheading';
  label: string;
  children: Array<NavigationLink | NavigationDropdown>;
}
