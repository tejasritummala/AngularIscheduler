import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*Import Calendar Module components for Home module Routes*/
import { CalendarComponent } from './calendar.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { AddCalendarEventsComponent } from './add-calendar-events/add-calendar-events.component';
import { AddNewCalendarComponent } from './add-new-calendar/add-new-calendar.component';
import { CorporateCalendarsComponent } from './corporate-calendars/corporate-calendars.component';
/*Configure Routes*/
const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    children: [
      {
        path: 'calendar',
        component: CalendarViewComponent
      },
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full'
      }
      ,{
        path: 'corporateCalendar',
        component: CorporateCalendarsComponent
      },
      {
        path: 'addEvent',
        component: AddCalendarEventsComponent
      }
    ]
  }
];

/*Add routes to calendar Routes Module*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutesModule { }
