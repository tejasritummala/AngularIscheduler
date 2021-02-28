import { Component, OnInit,ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddNewCalendarService } from './add-new-calendar.service';
import {AddNewCalendar , AddNewCalendarResponse } from './add-new-calendar.model';
declare var $: any;
@Component({
  selector: 'app-add-new-calendar',
  templateUrl: './add-new-calendar.component.html',
  styleUrls: ['./add-new-calendar.component.css']
})
export class AddNewCalendarComponent implements OnInit {
  calendarForm;
  timeZoneArr = ['none', 'local', 'UTC'];
  @ViewChild('newCalendarForm', { static: false }) newCalendarForm;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private addnewCalService: AddNewCalendarService, private snackBar: MatSnackBar) {
    this.calendarForm = new FormGroup({
      calName: new FormControl('', [Validators.required]),
      timeZone: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
   }

  ngOnInit() {
    // tslint:disable-next-line: prefer-for-of
    // for (var i = 0; i < timeZoneData.length; i++){
    //   this.timeZoneArr.push(timeZoneData[i]);
    // }

    const that = this;
    // tslint:disable-next-line: only-arrow-functions
    $.getJSON('https://fullcalendar.io/demo-timezones.json', function(timezones) {
      // tslint:disable-next-line: only-arrow-functions
      $.each(timezones, function(i, timezone) {
        that.timeZoneArr.push(timezone);
      });
    });
    
  }
  onCreateCalendar() {
    if (this.calendarForm.valid) {
        const obj = new AddNewCalendar(this.calendarForm.value);
        this.addnewCalService.createCalendar(obj).pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {
          const successData = new AddNewCalendarResponse(data);
          if (successData.code === 200) {
            this.snackBar.open(successData.message, '', {
              duration: 2000,
            });
            this.newCalendarForm.resetForm();
          } else {
            this.snackBar.open(successData.message, '', {
              duration: 2000,
            });
          }
        }, error => {
          const failureData = new AddNewCalendarResponse(error.error);
          this.snackBar.open(failureData.message ? failureData.message : 'Unable to process Your Request', '', {
            duration: 2000,
          });
        });
    } else {

    }
  }
  // tslint:disable-next-line: use-lifecycle-interface
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
