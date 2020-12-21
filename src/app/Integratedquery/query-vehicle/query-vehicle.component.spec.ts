import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryVehicleComponent } from './query-vehicle.component';

describe('QueryVehicleComponent', () => {
  let component: QueryVehicleComponent;
  let fixture: ComponentFixture<QueryVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
