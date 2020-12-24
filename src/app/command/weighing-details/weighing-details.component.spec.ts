import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeighingDetailsComponent } from './weighing-details.component';

describe('WeighingDetailsComponent', () => {
  let component: WeighingDetailsComponent;
  let fixture: ComponentFixture<WeighingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeighingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeighingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
