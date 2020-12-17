import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetIndexComponent } from './set-index.component';

describe('SetIndexComponent', () => {
  let component: SetIndexComponent;
  let fixture: ComponentFixture<SetIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
