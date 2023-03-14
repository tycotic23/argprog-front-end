import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIdiomaComponent } from './new-idioma.component';

describe('NewIdiomaComponent', () => {
  let component: NewIdiomaComponent;
  let fixture: ComponentFixture<NewIdiomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewIdiomaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
