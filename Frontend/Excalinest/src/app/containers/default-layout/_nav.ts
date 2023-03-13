import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Videojuegos',
    title: true
  },
  {
    name: 'Mis videojuegos',
    url: '/videogames/get',
    iconComponent: { name: 'cilPuzzle' }
  },
];
