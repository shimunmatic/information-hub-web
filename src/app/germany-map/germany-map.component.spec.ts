import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GermanyMapComponent } from './germany-map.component';

describe('GermanyMapComponent', () => {
  let component: GermanyMapComponent;
  let fixture: ComponentFixture<GermanyMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GermanyMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GermanyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
