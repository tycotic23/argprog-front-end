import { TestBed } from '@angular/core/testing';

import { TextomainService } from './textomain.service';

describe('TextomainService', () => {
  let service: TextomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
