import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerSignUpComponent } from './influencersignup.component';

describe('LoginComponent', () => {
  let component: InfluencerSignUpComponent;
  let fixture: ComponentFixture<InfluencerSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencerSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
