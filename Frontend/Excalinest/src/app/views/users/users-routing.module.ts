import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUserComponent } from './update-user/update-user.component';
import { PostUserComponent } from './post-user/post-user.component';
import { GetUsersComponent } from './get-users/get-users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpdateMyProfileComponent } from './update-my-profile/update-my-profile.component';

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
          usuario: 'administrador'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'post',
        component: PostUserComponent,
        data: {
          title: 'Registrar usuario',
          usuario: 'administrador'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'get',
        component: GetUsersComponent,
        data: {
          title: 'Usuarios',
          usuario: 'administrador'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        component: UserDetailComponent,
        data: {
          title: 'Detalles del usuario',
          usuario: 'administrador'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: MyProfileComponent,
        data: {
          title: 'Mi perfil',
          usuario: 'general'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'update-my-profile',
        component: UpdateMyProfileComponent,
        data: {
          title: 'Actualizar mi perfil',
          usuario: 'general'
        },
        canActivate: [AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
