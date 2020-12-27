import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunMonitoringComponent } from './run-monitoring.component';

describe('RunMonitoringComponent', () => {
  let component: RunMonitoringComponent;
  let fixture: ComponentFixture<RunMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
