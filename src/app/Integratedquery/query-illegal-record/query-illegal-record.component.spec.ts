import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryIllegalRecordComponent } from './query-illegal-record.component';

describe('QueryIllegalRecordComponent', () => {
  let component: QueryIllegalRecordComponent;
  let fixture: ComponentFixture<QueryIllegalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryIllegalRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryIllegalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
