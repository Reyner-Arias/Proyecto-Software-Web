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
    name: 'Mis videogames',
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
    name: 'Lista de etiquetas',
    url: '/tags/get',
    iconComponent: { name: 'cil-tags' }
  },
  {
    name: 'Crear etiqueta',
    url: '/tags/post',
    iconComponent: { name: 'cil-pencil'}
  },
];
