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
    name: 'Update',
    url: '/videogames/update',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Mis videojuegos',
    url: '/videogames/get',
    iconComponent: { name: 'cilPuzzle' }
  },
  {
    name: 'Etiquetas',
    title: true
  },
  {
    name: 'Lista',
    url: '/tags/get',
    iconComponent: { name: 'cil-tags' }
  },
  {
    name: 'Crear',
    url: '/tags/post',
    iconComponent: { name: 'cil-file'}
  },
];
