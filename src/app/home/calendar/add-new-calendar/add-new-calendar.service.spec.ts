import { TestBed } from '@angular/core/testing';

import { AddNewCalendarService } from './add-new-calendar.service';

describe('AddNewCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddNewCalendarService = TestBed.get(AddNewCalendarService);
    expect(service).toBeTruthy();
  });
});
