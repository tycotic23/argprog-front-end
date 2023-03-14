import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplaboralEditComponent } from './explaboral-edit.component';

describe('ExplaboralEditComponent', () => {
  let component: ExplaboralEditComponent;
  let fixture: ComponentFixture<ExplaboralEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplaboralEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplaboralEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
