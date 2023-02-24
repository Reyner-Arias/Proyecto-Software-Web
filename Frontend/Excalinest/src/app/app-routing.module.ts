import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetVideogamesComponent } from './components/get-videogames/get-videogames.component';
import { UpdateVideogameComponent } from './components/update-videogame/update-videogame.component';

/* redirectTo: '/get-videogames', debe cambiar a redirectTo: '/login', en sprint posterior */

const routes: Routes = [
  {
    path: '',
    redirectTo: '/get-videogames',
    pathMatch: 'full'
  },
  {
    path: 'get-videogames',
    component: GetVideogamesComponent
  },
  {
    path: 'update-videogame',
    component: UpdateVideogameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
