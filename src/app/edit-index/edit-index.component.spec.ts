import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndexComponent } from './edit-index.component';

describe('EditIndexComponent', () => {
  let component: EditIndexComponent;
  let fixture: ComponentFixture<EditIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
