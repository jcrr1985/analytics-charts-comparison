import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreejsChartsComponent } from './threejs-charts.component';

describe('ThreejsChartsComponent', () => {
  let component: ThreejsChartsComponent;
  let fixture: ComponentFixture<ThreejsChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreejsChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreejsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
