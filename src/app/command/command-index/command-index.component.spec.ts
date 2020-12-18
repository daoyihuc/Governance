import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandIndexComponent } from './command-index.component';

describe('CommandIndexComponent', () => {
  let component: CommandIndexComponent;
  let fixture: ComponentFixture<CommandIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
