import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignNewComponent } from './campaign-new.component';

describe('CampaignNewComponent', () => {
  let component: CampaignNewComponent;
  let fixture: ComponentFixture<CampaignNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
