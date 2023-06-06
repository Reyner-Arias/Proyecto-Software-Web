import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetApplicationsComponent } from './get-applications/get-applications.component';
import { PostApplicationComponent } from './post-application/post-application.component';

import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'get-all',
    pathMatch: 'full'
  },
  {
    path: '',
    data: {
      title: 'Aplicaciones',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'colors',
      },
      {
        path: 'get-all',
        component: GetApplicationsComponent,
        data: {
          title: 'Lista de versiones de Excalinest',
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'post',
        component: PostApplicationComponent,
        data: {
          title: 'Publicar nueva versión de Excalinest',
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
export class ExcalinestRoutingModule {}
