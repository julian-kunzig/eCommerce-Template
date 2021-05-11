import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferProgressComponent } from './offer-progress.component';

describe('OfferProgressComponent', () => {
  let component: OfferProgressComponent;
  let fixture: ComponentFixture<OfferProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
