import { TestBed } from '@angular/core/testing';

import { BotonfooterService } from './botonfooter.service';

describe('BotonfooterService', () => {
  let service: BotonfooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotonfooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
