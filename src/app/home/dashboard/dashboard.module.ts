import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*Imported all Dashboard module components*/
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardEventsComponent } from './dashboard-events/dashboard-events.component';

/*All Material Components Implemented into material components Module*/
import { MaterialComponentsModule } from './../../material-components/material-components.module';

/*Initiated All Dashboard page related router functionalities in this module*/
import { DashboardRoutesModule } from './dashboard-routes.module';


import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
/*Added components to Dashboard module*/
@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardEventsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutesModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class DasboardModule { }
