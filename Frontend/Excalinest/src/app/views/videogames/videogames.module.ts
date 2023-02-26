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
} from '@coreui/angular';

import { UpdateVideogameComponent } from './update-videogame/update-videogame.component';
import { VideogamesRoutingModule } from './videogames-routing.module';

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
    ListGroupModule
  ],
  declarations: [
    UpdateVideogameComponent
  ]
})
export class VideogamesModule {
}
