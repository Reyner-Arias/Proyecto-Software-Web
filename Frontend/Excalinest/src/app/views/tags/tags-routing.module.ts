import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetTagsComponent } from './get-tags/get-tags.component';
import { PostTagComponent } from './post-tag/post-tag.component';

//import { UpdateTagComponent } from './update-tag/update-tag.component';
//import { TagDetailComponent } from './tag-detail/tag-detail.component';

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
          title: 'Post tag',
        }
      },
      /*
      {
        path: 'update',
        component: UpdateTagComponent,
        data: {
          title: 'Update tag',
        }
      },
      */
      {
        path: 'get',
        component: GetTagsComponent,
        data: {
          title: 'Etiquetas',
        }
      },
      /*
      {
        path: 'tag',
        component: TagDetailComponent,
        data: {
          title: 'Detalles del videojuego'
        }
      }
      */
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule {}
