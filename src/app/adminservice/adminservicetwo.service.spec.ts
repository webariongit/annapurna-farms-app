import { TestBed } from '@angular/core/testing';

import { AdminservicetwoService } from './adminservicetwo.service';

describe('AdminservicetwoService', () => {
  let service: AdminservicetwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminservicetwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
