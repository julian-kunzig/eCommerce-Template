import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetQuickValueCenterComponent } from './widget-quick-value-center.component';

describe('WidgetQuickCenterComponent', () => {
  let component: WidgetQuickValueCenterComponent;
  let fixture: ComponentFixture<WidgetQuickValueCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetQuickValueCenterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetQuickValueCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
