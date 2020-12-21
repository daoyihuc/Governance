import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandCarComponent } from './command-car.component';

describe('CommandCarComponent', () => {
  let component: CommandCarComponent;
  let fixture: ComponentFixture<CommandCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
