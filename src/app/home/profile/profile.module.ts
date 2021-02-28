import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*Imported all Profile module components*/
import { ProfileComponent } from './profile.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

/*All Material Components Implemented into material components Module*/
import { MaterialComponentsModule } from './../../material-components/material-components.module';

/*Initiated All Dashboard page related router functionalities in this module*/
import { ProfileRoutesModule } from './profile-routes.module';


import {FormsModule, ReactiveFormsModule } from '@angular/forms';
/*Added components to Dashboard module*/
@NgModule({
  declarations: [
    ProfileComponent,
    ProfileViewComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutesModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ProfileModule { }
