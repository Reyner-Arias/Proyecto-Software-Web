import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetVideogamesComponent } from './get-videogames/get-videogames.component';

import { UpdateVideogameComponent } from './update-videogame/update-videogame.component';
import { VideogameDetailComponent } from './videogame-detail/videogame-detail.component';
import { PostVideogameComponent } from './post-videogame/post-videogame.component';

import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'get',
    pathMatch: 'full'
  },
  {
    path: '',
    data: {
      title: 'Videojuegos',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'colors',
      },
      {
        path: 'update',
        component: UpdateVideogameComponent,
        data: {
          title: 'Editar videojuego',
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'get',
        component: GetVideogamesComponent,
        data: {
          title: 'Mis videojuegos',
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'post',
        component: PostVideogameComponent,
        data: {
          title: 'Publicar videojuego'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'videogame',
        component: VideogameDetailComponent,
        data: {
          title: 'Detalles del videojuego'
        },
        canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideogamesRoutingModule {}
