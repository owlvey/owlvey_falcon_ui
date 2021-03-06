import { NbMenuItem } from '@nebular/theme';
import { environment } from '../../environments/environment';

let DEV_MENU = [];
if (environment.showDevMenu) {
  DEV_MENU = [

  ];
}

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    home: true,
  },
  // {
  //   title: 'Organization Performance',
  //   icon: 'home-outline',
  // },
  // {
  //   title: 'Operation Performance',
  //   icon: 'home-outline',
  // },
  {
    title: 'Organizations',
    icon: 'globe-outline',
  },
  {
    title: 'Members',
    icon: 'person-outline',
  },
  {
    title: 'Threats',
    icon: 'person-outline',
  },

  {
    title: 'Products',
    group: true,
  },
  {
    title: 'Products',
    icon: 'bulb-outline',
  },
  {
    title: 'Squads',
    icon: 'people-outline',
  },

  {
    title: 'Groups',
    icon: 'award-outline',
  },
  {
    title: 'Journeys',
    icon: 'award-outline',
  },
  {
    title: 'Features',
    icon: 'cube-outline',
  },
  {
    title: 'Sources',
    icon: 'archive-outline',
  },
  {
    title: 'Risks',
    icon: 'archive-outline',
  },
  {
    title: 'Services',
    icon: 'archive-outline',
  },
  {
    title: 'Administration',
    group: true,
  },
  {
    title: 'Exports',
    icon: 'upload-outline',
  },
  {
    title: 'Sync',
    icon: 'upload-outline',
  },
  {
    title: 'Migrations',
    icon: 'upload-outline',
  },

  ...DEV_MENU,
];
