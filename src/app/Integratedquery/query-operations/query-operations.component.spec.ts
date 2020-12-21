import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryOperationsComponent } from './query-operations.component';

describe('QueryOperationsComponent', () => {
  let component: QueryOperationsComponent;
  let fixture: ComponentFixture<QueryOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
