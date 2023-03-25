import { TestBed } from '@angular/core/testing';

import { SkillInterceptorService } from './skill-interceptor.service';

describe('SkillInterceptorService', () => {
  let service: SkillInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
