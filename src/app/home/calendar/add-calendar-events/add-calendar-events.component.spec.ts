import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendarEventsComponent } from './add-calendar-events.component';

describe('AddCalendarEventsComponent', () => {
  let component: AddCalendarEventsComponent;
  let fixture: ComponentFixture<AddCalendarEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCalendarEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCalendarEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
