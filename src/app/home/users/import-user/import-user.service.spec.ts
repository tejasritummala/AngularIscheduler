import { TestBed } from '@angular/core/testing';

import { ImportUserService } from './import-user.service';

describe('ImportUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportUserService = TestBed.get(ImportUserService);
    expect(service).toBeTruthy();
  });
});
