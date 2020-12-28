import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorRecordComponent } from './inspector-record.component';

describe('InspectorRecordComponent', () => {
  let component: InspectorRecordComponent;
  let fixture: ComponentFixture<InspectorRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectorRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
