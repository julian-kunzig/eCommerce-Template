import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverGridComponent } from './discover-grid.component';

describe('DiscoverGridComponent', () => {
  let component: DiscoverGridComponent;
  let fixture: ComponentFixture<DiscoverGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
