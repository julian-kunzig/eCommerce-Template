import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPackComponent } from './offer-pack.component';

describe('OfferPackComponent', () => {
  let component: OfferPackComponent;
  let fixture: ComponentFixture<OfferPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
