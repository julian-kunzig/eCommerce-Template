import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerGridComponent } from './influencer-grid.component';

describe('InfluencerGridComponent', () => {
  let component: InfluencerGridComponent;
  let fixture: ComponentFixture<InfluencerGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencerGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
