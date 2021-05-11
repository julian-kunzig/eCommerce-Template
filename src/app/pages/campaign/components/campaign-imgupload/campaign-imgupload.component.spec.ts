import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignImguploadComponent } from './campaign-imgupload.component';

describe('CampaignImguploadComponent', () => {
  let component: CampaignImguploadComponent;
  let fixture: ComponentFixture<CampaignImguploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignImguploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignImguploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
