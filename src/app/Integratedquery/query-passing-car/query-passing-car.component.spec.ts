import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryPassingCarComponent } from './query-passing-car.component';

describe('QueryPassingCarComponent', () => {
  let component: QueryPassingCarComponent;
  let fixture: ComponentFixture<QueryPassingCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryPassingCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryPassingCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
