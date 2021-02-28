import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*Imported all Dashboard module components*/
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardEventsComponent } from './dashboard-events/dashboard-events.component';

/*Configure Routes*/
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'main',
        component: DashboardHomeComponent
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'events',
        component: DashboardEventsComponent
      }
    ]
  }
];

/*Add routes to Home Routes Module*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutesModule { }
