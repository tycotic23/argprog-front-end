import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConocimientoEditComponent } from './conocimiento-edit.component';

describe('ConocimientoEditComponent', () => {
  let component: ConocimientoEditComponent;
  let fixture: ComponentFixture<ConocimientoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConocimientoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConocimientoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
