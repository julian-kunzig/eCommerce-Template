import { ConfigName } from './config-name.model';

export interface Config {
  id: ConfigName;
  rtl?: boolean;
  name: string;
  imgSrc: string;
  layout: 'vertical' | 'horizontal';
  boxed: boolean;
  sidenav: {
    title: string;
    imageUrl: string;
    mobileImageUrl: string;
    showCollapsePin: boolean;
    showTitle: boolean;
    state: 'expanded' | 'collapsed';
  };
  toolbar: {
    fixed: boolean;
  };
  navbar: {
    position: 'below-toolbar' | 'in-toolbar';
  };
  footer: {
    visible: boolean;
    fixed: boolean;
  };
}
