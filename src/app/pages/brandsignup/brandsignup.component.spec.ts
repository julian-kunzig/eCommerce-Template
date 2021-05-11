import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSignUpComponent } from './brandsignup.component';

describe('LoginComponent', () => {
  let component: BrandSignUpComponent;
  let fixture: ComponentFixture<BrandSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
