import { TestBed } from '@angular/core/testing';

import { SubfooterdatoService } from './subfooterdato.service';

describe('SubfooterdatoService', () => {
  let service: SubfooterdatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubfooterdatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
