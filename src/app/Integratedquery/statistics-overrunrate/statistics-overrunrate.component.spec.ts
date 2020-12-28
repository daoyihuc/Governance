import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsOverrunrateComponent } from './statistics-overrunrate.component';

describe('StatisticsOverrunrateComponent', () => {
  let component: StatisticsOverrunrateComponent;
  let fixture: ComponentFixture<StatisticsOverrunrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsOverrunrateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsOverrunrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
