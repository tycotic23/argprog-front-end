import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomasEditComponent } from './idiomas-edit.component';

describe('IdiomasEditComponent', () => {
  let component: IdiomasEditComponent;
  let fixture: ComponentFixture<IdiomasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdiomasEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdiomasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
