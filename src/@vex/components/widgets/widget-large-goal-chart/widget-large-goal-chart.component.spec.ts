import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetLargeGoalChartComponent } from './widget-large-goal-chart.component';

describe('WidgetLargeGoalChartComponent', () => {
  let component: WidgetLargeGoalChartComponent;
  let fixture: ComponentFixture<WidgetLargeGoalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetLargeGoalChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetLargeGoalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
