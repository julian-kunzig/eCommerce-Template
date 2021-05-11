import { mergeDeep } from '../utils/merge-deep';
import { ConfigName } from '../interfaces/config-name.model';
import { Config } from '../interfaces/config.model';

const defaultConfig: Config = {
  id: ConfigName.apollo,
  name: 'Apollo',
  imgSrc: '//vex-landing.visurel.com/assets/img/layouts/apollo.png',
  layout: 'horizontal',
  boxed: false,
  sidenav: {
    title: 'VEX',
    showTitle: false,
    imageUrl: 'assets/img/logo.png',
    mobileImageUrl: 'assets/img/logo-mobile.png',
    showCollapsePin: false,
    state: 'expanded'
  },
  toolbar: {
    fixed: true
  },
  navbar: {
    position: 'below-toolbar'
  },
  footer: {
    visible: false,
    fixed: true
  }
};

export const configs: Config[] = [
  defaultConfig,
  mergeDeep({ ...defaultConfig }, {
    id: ConfigName.hermes,
    name: 'Hermes',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/hermes.png',
    layout: 'vertical',
    boxed: true,
    toolbar: {
      fixed: false
    },
    footer: {
      fixed: false
    }
  }),
  mergeDeep({ ...defaultConfig }, {
    id: ConfigName.ares,
    name: 'Ares',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/ares.png',
    toolbar: {
      fixed: false
    },
    navbar: {
      position: 'in-toolbar'
    },
    footer: {
      fixed: false
    }
  }),
  mergeDeep({ ...defaultConfig }, {
    id: ConfigName.zeus,
    name: 'Zeus',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/zeus.png',
    sidenav: {
      state: 'collapsed'
    },
  }),
  mergeDeep({ ...defaultConfig }, {
    id: ConfigName.ikaros,
    name: 'Ikaros',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/ikaros.png',
    layout: 'vertical',
    boxed: true,
    toolbar: {
      fixed: false
    },
    navbar: {
      position: 'in-toolbar'
    },
    footer: {
      fixed: false
    }
  })
];
