import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaboralComponent } from './edit-laboral.component';

describe('EditLaboralComponent', () => {
  let component: EditLaboralComponent;
  let fixture: ComponentFixture<EditLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLaboralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
