import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetVideogamesComponent } from './get-videogames/get-videogames.component';

import { UpdateVideogameComponent } from './update-videogame/update-videogame.component';
import { VideogameDetailComponent } from './videogame-detail/videogame-detail.component';
import { PostVideogameComponent } from './post-videogame/post-videogame.component';

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
        }
      },
      {
        path: 'get',
        component: GetVideogamesComponent,
        data: {
          title: 'Mis videojuegos',
        }
      },
      {
        path: 'post',
        component: PostVideogameComponent,
        data: {
          title: 'Post'
        }
      },
      {
        path: 'videogame',
        component: VideogameDetailComponent,
        data: {
          title: 'Detalles del videojuego'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideogamesRoutingModule {}
