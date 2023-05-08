import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PutUserComponent } from './put-user/put-user.component';
import { PostUserComponent } from './post-user/post-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'get',
    pathMatch: 'full'
  },
  {
    path: '',
    data: {
      title: 'Usuarios',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'colors',
      },
      {
        path: 'update',
        component: PutUserComponent,
        data: {
          title: 'Editar usuario',
        }
      },
      {
        path: 'post',
        component: PostUserComponent,
        data: {
          title: 'Registrar usuario'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
