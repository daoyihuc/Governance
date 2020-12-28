import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsOverLimitComponent } from './statistics-over-limit.component';

describe('StatisticsOverLimitComponent', () => {
  let component: StatisticsOverLimitComponent;
  let fixture: ComponentFixture<StatisticsOverLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsOverLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsOverLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
