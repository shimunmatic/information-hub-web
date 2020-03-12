import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaTableComponent } from './corona-table.component';

describe('CoronaTableComponent', () => {
  let component: CoronaTableComponent;
  let fixture: ComponentFixture<CoronaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
