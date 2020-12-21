import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryOperationComponent } from './query-operation.component';

describe('QueryOperationComponent', () => {
  let component: QueryOperationComponent;
  let fixture: ComponentFixture<QueryOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
