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
    name: 'Lista de etiquetas',
    url: '/tags/get',
    iconComponent: { name: 'cil-tags' }
  },
  {
    name: 'Crear etiqueta',
    url: '/tags/post',
    iconComponent: { name: 'cil-pencil'}
  },
  {
    name: 'Usuarios',
    title: true
  },
  {
    name: 'Lista de usuarios',
    url: '/users/get',
    iconComponent: { name: 'cil-people'}
  },
  {
    name: 'Registrar usuario',
    url: '/users/post',
    iconComponent: { name: 'cil-user-follow'}
  },
  {
    name: 'Aplicación Excalinest',
    title: true
  },
  {
    name: 'Lista de aplicaciones',
    url: '/applications/get-all',
    iconComponent: { name: 'cil-list'}
  },
  {
    name: 'Registrar aplicación',
    url: '/applications/post',
    iconComponent: { name: 'cil-task'}
  }
];
