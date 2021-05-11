import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetQuickLineChartComponent } from './widget-quick-line-chart.component';

describe('WidgetQuickLineComponent', () => {
  let component: WidgetQuickLineChartComponent;
  let fixture: ComponentFixture<WidgetQuickLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetQuickLineChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetQuickLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
