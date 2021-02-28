import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*Imported all Dashboard module components*/
import { ProfileComponent } from './profile.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

/*Configure Routes*/
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'profileView',
        component: ProfileViewComponent
      },
      {
        path: '',
        redirectTo: 'profileView',
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
export class ProfileRoutesModule { }
