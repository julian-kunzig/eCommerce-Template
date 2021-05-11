export interface Link {
  label: string;
  route: string | string[];
  params?: { };
  routerLinkActiveOptions?: { exact: boolean };
  disabled?: boolean;
}
