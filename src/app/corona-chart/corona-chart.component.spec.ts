import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaChartComponent } from './corona-chart.component';

describe('CoronaChartComponent', () => {
  let component: CoronaChartComponent;
  let fixture: ComponentFixture<CoronaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronaChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
