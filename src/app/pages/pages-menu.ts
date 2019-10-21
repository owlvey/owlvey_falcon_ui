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
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Product Dashboard',
    icon: 'home-outline',
  },
  {
    title: 'Concepts',
    group: true,
  },
  {
    title: 'Organizations',
    icon: 'globe-outline',
  },
  {
    title: 'Members',
    icon: 'person-outline',
  },  
  {
    title: 'Squads',
    icon: 'people-outline',
  },
  {
    title: 'Products',
    icon: 'bulb-outline',
  },
  {
    title: 'Services',
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
    title: 'Migrations',
    icon: 'upload-outline',
  },
  {
    title: 'Sync',
    icon: 'upload-outline',
  },
  ...DEV_MENU,
];

/*
{
    title: 'Incidents',
    icon: 'activity-outline',
  },
*/ 
