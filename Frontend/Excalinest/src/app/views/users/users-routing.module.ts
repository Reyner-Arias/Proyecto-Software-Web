import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUserComponent } from './update-user/update-user.component';
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
        component: UpdateUserComponent,
        data: {
          title: 'Actualizar usuario',
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
