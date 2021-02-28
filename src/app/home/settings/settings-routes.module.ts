import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*Imported all Dashboard module components*/
import { SettingsComponent } from './settings.component';
import { SettingsViewComponent } from './settings-view/settings-view.component';

/*Configure Routes*/
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'settingsView',
        component: SettingsViewComponent
      },
      {
        path: '',
        redirectTo: 'settingsView',
        pathMatch: 'full'
      }
    ]
  }
];

/*Add routes to Home Routes Module*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutesModule { }
