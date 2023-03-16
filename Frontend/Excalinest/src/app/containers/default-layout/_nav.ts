import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/home',
    iconComponent: { name: 'cil-home' }
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
  {
    name: 'Publicar videojuego',
    url: '/videogames/post',
    iconComponent: { name: 'cil-paper-plane' }
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
    iconComponent: { name: 'cil-pencil'}
  },
];
