import { TestBed } from '@angular/core/testing';

import { ExplaboralService } from './explaboral.service';

describe('ExplaboralService', () => {
  let service: ExplaboralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExplaboralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
