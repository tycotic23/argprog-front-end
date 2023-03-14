import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubfooterdatoEditComponent } from './subfooterdato-edit.component';

describe('SubfooterdatoEditComponent', () => {
  let component: SubfooterdatoEditComponent;
  let fixture: ComponentFixture<SubfooterdatoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubfooterdatoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubfooterdatoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
