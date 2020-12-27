import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllegalDetailsComponent } from './illegal-details.component';

describe('IllegalDetailsComponent', () => {
  let component: IllegalDetailsComponent;
  let fixture: ComponentFixture<IllegalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllegalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllegalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
