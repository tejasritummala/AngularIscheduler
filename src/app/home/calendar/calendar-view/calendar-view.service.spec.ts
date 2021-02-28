import { TestBed } from '@angular/core/testing';

import { CalendarViewService } from './calendar-view.service';

describe('CalendarViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarViewService = TestBed.get(CalendarViewService);
    expect(service).toBeTruthy();
  });
});
