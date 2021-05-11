import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverCardComponent } from './discover-card.component';

describe('DiscoverCardComponent', () => {
  let component: DiscoverCardComponent;
  let fixture: ComponentFixture<DiscoverCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
