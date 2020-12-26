import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionInformationComponent } from './supervision-information.component';

describe('SupervisionInformationComponent', () => {
  let component: SupervisionInformationComponent;
  let fixture: ComponentFixture<SupervisionInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
