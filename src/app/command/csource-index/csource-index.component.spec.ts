import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsourceIndexComponent } from './csource-index.component';

describe('CsourceIndexComponent', () => {
  let component: CsourceIndexComponent;
  let fixture: ComponentFixture<CsourceIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsourceIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsourceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
