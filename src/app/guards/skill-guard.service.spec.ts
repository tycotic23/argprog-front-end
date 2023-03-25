import { TestBed } from '@angular/core/testing';

import { SkillGuardService } from './skill-guard.service';

describe('SkillGuardService', () => {
  let service: SkillGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
