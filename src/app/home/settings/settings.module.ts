import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*Imported all settings module components*/
import { SettingsComponent } from './settings.component';
import { SettingsViewComponent } from './settings-view/settings-view.component';

/*All Material Components Implemented into material components Module*/
import { MaterialComponentsModule } from './../../material-components/material-components.module';

/*Initiated All settings page related router functionalities in this module*/
import { SettingsRoutesModule } from './settings-routes.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


import {FormsModule, ReactiveFormsModule } from '@angular/forms';
/*Added components to settings module*/
@NgModule({
  declarations: [
    SettingsComponent,
    SettingsViewComponent,
  ],
  imports: [
    NgxMaterialTimepickerModule,
    CommonModule,
    SettingsRoutesModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
})
export class SettingsModule { }
