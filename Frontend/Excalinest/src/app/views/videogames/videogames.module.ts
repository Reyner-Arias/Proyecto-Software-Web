import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
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
    TabsModule
  ],
  declarations: [
    UpdateVideogameComponent
  ]
})
export class VideogamesModule {
}
