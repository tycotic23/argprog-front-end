import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextomainEditComponent } from './textomain-edit.component';

describe('TextomainEditComponent', () => {
  let component: TextomainEditComponent;
  let fixture: ComponentFixture<TextomainEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextomainEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextomainEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
