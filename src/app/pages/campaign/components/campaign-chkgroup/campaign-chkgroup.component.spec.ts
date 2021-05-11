import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignChkgroupComponent } from './campaign-chkgroup.component';

describe('CampaignChkgroupComponent', () => {
  let component: CampaignChkgroupComponent;
  let fixture: ComponentFixture<CampaignChkgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignChkgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignChkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
