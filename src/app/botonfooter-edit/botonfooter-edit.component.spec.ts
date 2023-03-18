import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonfooterEditComponent } from './botonfooter-edit.component';

describe('BotonfooterEditComponent', () => {
  let component: BotonfooterEditComponent;
  let fixture: ComponentFixture<BotonfooterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonfooterEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonfooterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
