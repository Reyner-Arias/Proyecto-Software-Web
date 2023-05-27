import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUserComponent } from './update-user/update-user.component';
import { PostUserComponent } from './post-user/post-user.component';
import { GetUsersComponent } from './get-users/get-users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

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
      },
      {
        path: 'get',
        component: GetUsersComponent,
        data: {
          title: 'Usuarios',
        }
      },
      {
        path: 'user',
        component: UserDetailComponent,
        data: {
          title: 'Detalles del usuario',
        }
      },
      {
        path: 'profile',
        component: MyProfileComponent,
        data: {
          title: 'Mi perfil',
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
