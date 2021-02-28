import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*Imported all home module components*/
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ImportUserComponent } from './import-user/import-user.component';
/*All Material Components Implemented into material components Module*/
import { MaterialComponentsModule } from './../../material-components/material-components.module';
import { NgxFileDropModule } from 'ngx-file-drop';

/*Initiated All Home page related router functionalities in this module*/
import { UsersRoutesModule } from './users-routes.module';
import { BottomSheetDialogComponent } from '../../shared/Dialogs/bottom-sheet-dialog/bottom-sheet-dialog.component';


import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
/*Added components to Home module*/
@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    AddUserComponent,
    ImportUserComponent,
    BottomSheetDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutesModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule
  ],
  entryComponents: [BottomSheetDialogComponent]
})
export class UsersModule { }
