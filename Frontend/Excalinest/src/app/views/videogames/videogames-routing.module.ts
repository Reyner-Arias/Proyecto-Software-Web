import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetVideogamesComponent } from './get-videogames/get-videogames.component';

import { UpdateVideogameComponent } from './update-videogame/update-videogame.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Videogames',
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
          title: 'Update videogame',
        }
      },
      {
        path: 'get',
        component: GetVideogamesComponent,
        data: {
          title: 'Get all videogames',
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
