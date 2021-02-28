import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCalendarsComponent } from './corporate-calendars.component';

describe('CorporateCalendarsComponent', () => {
  let component: CorporateCalendarsComponent;
  let fixture: ComponentFixture<CorporateCalendarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCalendarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCalendarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
