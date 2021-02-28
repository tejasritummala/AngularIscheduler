import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput } from '@fullcalendar/core';
/*Full Calendar Modules Injection*/
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AddNewCalendarComponent } from '../add-new-calendar/add-new-calendar.component';

import { CalendarViewService } from './calendar-view.service';
import {CalendarView , CalendarsResponse , CalendarsList } from './calendar-view.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  options: OptionsInput;
  @Input() searchText: string;
  @Input() searchUser: string;
  private onDestroy$: Subject<void> = new Subject<void>();

  masterchecked = false;
  masterindeterminate = false;
  calArr = [];

  usersArr = [{ id: '1', name: 'John' },
  { id: '2', name: 'Andrew' },
  { id: '3', name: 'Michel' },
  { id: '4', name: 'Mark' },
  { id: '5', name: 'John' },
  { id: '6', name: 'Andrew' },
  { id: '7', name: 'Michel' },
   {id: '8', name: 'Cinthia'},
   { id: '9', name: 'Michel' },
   {id: '10', name: 'Cinthia'}];

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog , private calViewService: CalendarViewService, private snackBar: MatSnackBar) { }


  onClick() {
    const filterResult: any = this.calArr.filter(u =>
      u.isChecked === true );
  }
  getCustomCalendars() {

    this.calViewService.getCalendars().pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {
      const successData = new CalendarsResponse(data);
      if (successData.code === 200) {

        this.calArr = successData.calendars;
      } else {
        this.snackBar.open(successData.message, '', {
          duration: 2000,
        });
      }
    }, error => {
      const failData = new CalendarsResponse(error.error);
      this.snackBar.open(failData.message ? failData.message : 'Please Check your internet settings', '', {
        duration: 2000,
      });
    });


  }
  setAsDefault(calObj) {
    const calendarObj = new CalendarsList(calObj);

    this.calViewService.setdefaultCalendar(calendarObj).pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {
      const successData = new CalendarsResponse(data);
      if (successData.code === 200) {

        this.getCustomCalendars();
      } else {
        this.snackBar.open(successData.message, '', {
          duration: 2000,
        });
      }
    }, error => {
      const failData = new CalendarsResponse(error.error);
      this.snackBar.open(failData.message ? failData.message : 'Please Check your internet settings', '', {
        duration: 2000,
      });
    });
  }

  ngOnInit() {
    this.getCustomCalendars();
    this.options = {
      eventBackgroundColor: '#632980',
      eventTextColor: 'white',
      timeZone: 'UTC',
      editable: true,
      selectable: false,
      height: 635,
      header: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridDay,timeGridWeek',
      },
      contentHeight: 600,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      events: [
      {
      title: 'Meeting with Dr.Jones',
      start: '2019-12-11T10:00:00',
      end: '2019-12-11T12:00:00',
      description: 'Assignee name :',
       },
       {
      title: 'Meeting with Dr.Carl',
      start: '2019-12-13T08:00:00',
      end: '2019-12-13T10:00:00',
      description: 'Assignee name :',},
      {
        title: 'Event 1',
        start: '2019-12-10T20:00:00',
        end: '2019-12-10T22:00:00',
        description: 'This is a cool event'
        },
        {
        title: 'Event 10',
        start: '2019-12-10T20:00:00',
        end: '2019-12-10T23:00:00',
        description: 'This is a cool event'
        },
        {
        title: 'Event 11',
        start: '2019-12-10T06:00:00',
        end: '2019-12-10T09:00:00',
        extendedProps: {
        department: 'BioChemistry'
        },
        description: 'Lecture'
        },
        { title: 'event 2', date: '2019-12-11' }
      ]
      };
  }
  createNewEvent() {
    this.router.navigate(['../addEvent'],{relativeTo: this.route });
  }
  createNewCalendar() {
    const dialogRef = this.dialog.open(AddNewCalendarComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCustomCalendars();
    });
  }
  onShowAllCalendars() {
    this.router.navigate(['../corporateCalendar'], {relativeTo: this.route });
  }
   // tslint:disable-next-line: use-lifecycle-interface
   public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }

}
