import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryenterpriseComponent } from './queryenterprise.component';

describe('QueryenterpriseComponent', () => {
  let component: QueryenterpriseComponent;
  let fixture: ComponentFixture<QueryenterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryenterpriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryenterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
