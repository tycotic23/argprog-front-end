import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEditComponent } from './nav-edit.component';

describe('NavEditComponent', () => {
  let component: NavEditComponent;
  let fixture: ComponentFixture<NavEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
