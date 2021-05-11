import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryToolbarComponent } from './secondary-toolbar.component';

describe('SecondaryToolbarComponent', () => {
  let component: SecondaryToolbarComponent;
  let fixture: ComponentFixture<SecondaryToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecondaryToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
