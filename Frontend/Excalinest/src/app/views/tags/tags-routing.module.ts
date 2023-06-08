import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetTagsComponent } from './get-tags/get-tags.component';
import { PostTagComponent } from './post-tag/post-tag.component';
import { UpdateTagComponent } from './update-tag/update-tag.component';

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
      title: 'Etiquetas',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'colors',
      },
      {
        path: 'post',
        component: PostTagComponent,
        data: {
          title: 'Crear etiqueta',
          usuario: 'administrador'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'update',
        component: UpdateTagComponent,
        data: {
          title: 'Actualizar etiqueta',
          usuario: 'administrador'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'get',
        component: GetTagsComponent,
        data: {
          title: 'Etiquetas',
          usuario: 'administrador'
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
export class TagsRoutingModule {}
