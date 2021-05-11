import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignQuestgroupComponent } from './campaign-questgroup.component';

describe('CampaignQuestgroupComponent', () => {
  let component: CampaignQuestgroupComponent;
  let fixture: ComponentFixture<CampaignQuestgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignQuestgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignQuestgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
