import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAssistantComponent } from './widget-assistant.component';

describe('WidgetAssistantComponent', () => {
  let component: WidgetAssistantComponent;
  let fixture: ComponentFixture<WidgetAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetAssistantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
