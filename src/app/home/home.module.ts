import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*Imported all home module components*/
import { HomeComponent } from './home.component';
/*All Material Components Implemented into material components Module*/
import { MaterialComponentsModule } from '../material-components/material-components.module';

import { CheckListComponent } from '../shared/components/check-list/check-list.component';

/*Initiated All Home page related router functionalities in this module*/
import { HomeRoutesModule } from './home-routes.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*Added components to Home module*/
@NgModule({
  declarations: [
    HomeComponent,
    CheckListComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutesModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule 
  ],
})
export class HomeModule { }
