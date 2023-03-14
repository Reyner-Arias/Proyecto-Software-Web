import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
  NavModule, 
  UtilitiesModule, 
  TabsModule,
  ModalModule
} from '@coreui/angular';

import { TagsRoutingModule } from './tags-routing.module';
import { GetTagsComponent } from './get-tags/get-tags.component';
import { PostTagComponent } from './post-tag/post-tag.component';
//import { UpdateTagComponent } from './update-tag/update-tag.component';
//import { TagDetailComponent } from './tag-detail/tag-detail.component';

@NgModule({
  imports: [
    CommonModule,
    TagsRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    FormModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule,
    ModalModule
  ],
  declarations: [
    //UpdateTagComponent,
    PostTagComponent,
    GetTagsComponent,
    //TagDetailComponent
  ]
})
export class TagsModule {
}
