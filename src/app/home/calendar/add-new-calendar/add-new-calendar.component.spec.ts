import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCalendarComponent } from './add-new-calendar.component';

describe('AddNewCalendarComponent', () => {
  let component: AddNewCalendarComponent;
  let fixture: ComponentFixture<AddNewCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
