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

import { PostApplicationComponent } from './post-application/post-application.component';
import { ExcalinestRoutingModule } from './applications-routing.module';
import { GetApplicationsComponent } from './get-applications/get-applications.component';

@NgModule({
  imports: [
    CommonModule,
    ExcalinestRoutingModule,
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
    PostApplicationComponent,
    GetApplicationsComponent,
  ]
})

export class ExcalinestModule {
}
