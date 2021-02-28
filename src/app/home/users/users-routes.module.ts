import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*Import Home Module components for Home module Routes*/
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ImportUserComponent } from './import-user/import-user.component'

/*Configure Routes*/
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'userslist',
        component: UsersListComponent
      },
      {
        path: '',
        redirectTo: 'userslist',
        pathMatch: 'full'
      },
      {
        path: 'adduser',
        component: AddUserComponent
      },
      {
        path: 'importuser',
        component: ImportUserComponent
   
      }
    ]
  }
];

/*Add routes to Home Routes Module*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutesModule { }
