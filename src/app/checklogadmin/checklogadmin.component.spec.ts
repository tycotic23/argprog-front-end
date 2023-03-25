import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklogadminComponent } from './checklogadmin.component';

describe('ChecklogadminComponent', () => {
  let component: ChecklogadminComponent;
  let fixture: ComponentFixture<ChecklogadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklogadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecklogadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
