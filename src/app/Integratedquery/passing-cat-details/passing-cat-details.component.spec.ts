import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassingCatDetailsComponent } from './passing-cat-details.component';

describe('PassingCatDetailsComponent', () => {
  let component: PassingCatDetailsComponent;
  let fixture: ComponentFixture<PassingCatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassingCatDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassingCatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
