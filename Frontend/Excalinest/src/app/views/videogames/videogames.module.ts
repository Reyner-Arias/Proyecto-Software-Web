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

import { UpdateVideogameComponent } from './update-videogame/update-videogame.component';
import { VideogamesRoutingModule } from './videogames-routing.module';
import { GetVideogamesComponent } from './get-videogames/get-videogames.component';

@NgModule({
  imports: [
    CommonModule,
    VideogamesRoutingModule,
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
    UpdateVideogameComponent,
    GetVideogamesComponent
  ]
})
export class VideogamesModule {
}
