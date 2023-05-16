import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetApplicationsComponent } from './get-applications/get-applications.component';
import { PostApplicationComponent } from './post-application/post-application.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'get',
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
        }
      },
      {
        path: 'post',
        component: PostApplicationComponent,
        data: {
          title: 'Publicar nueva versión de Excalinest',
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcalinestRoutingModule {}
