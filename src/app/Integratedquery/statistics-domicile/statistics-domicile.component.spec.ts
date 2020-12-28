import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsDomicileComponent } from './statistics-domicile.component';

describe('StatisticsDomicileComponent', () => {
  let component: StatisticsDomicileComponent;
  let fixture: ComponentFixture<StatisticsDomicileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsDomicileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsDomicileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
