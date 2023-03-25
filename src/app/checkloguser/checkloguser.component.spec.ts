import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckloguserComponent } from './checkloguser.component';

describe('CheckloguserComponent', () => {
  let component: CheckloguserComponent;
  let fixture: ComponentFixture<CheckloguserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckloguserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckloguserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
