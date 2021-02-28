import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*Imported all calendar module components*/
import { CalendarComponent } from './calendar.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';


/*All Material Components Implemented into material components Module*/
import { MaterialComponentsModule } from './../../material-components/material-components.module';

/*Initiated All calendar page related router functionalities in this module*/
import { CalendarRoutesModule } from './calendar-routes.module';

import { FullCalendarModule } from '@fullcalendar/angular';
import { FilterPipe } from '../../CustomPipes/filter.pipe';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { AddCalendarEventsComponent } from './add-calendar-events/add-calendar-events.component';
import { AddNewCalendarComponent } from './add-new-calendar/add-new-calendar.component';
import { CorporateCalendarsComponent } from './corporate-calendars/corporate-calendars.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

/*Added components to calendar module*/
@NgModule({
  declarations: [
    CalendarComponent,
    CalendarViewComponent,
    FilterPipe,
    AddCalendarEventsComponent,
    AddNewCalendarComponent,
    CorporateCalendarsComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutesModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgxMaterialTimepickerModule
  ],
  entryComponents: [AddNewCalendarComponent]
})
export class CalendarModule { }
