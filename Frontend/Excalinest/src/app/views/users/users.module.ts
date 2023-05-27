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

import { UsersRoutingModule } from './users-routing.module';
import { PostUserComponent } from './post-user/post-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { GetUsersComponent } from './get-users/get-users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    PostUserComponent,
    UpdateUserComponent,
    GetUsersComponent,
    UserDetailComponent
  ]
})
export class UsersModule {
}
