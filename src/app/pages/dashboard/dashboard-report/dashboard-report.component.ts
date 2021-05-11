import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CampaignService} from '../../../providers/campaign.service';
import {issueData} from '../../../../static-data/questions';

@Component({
  selector: 'vex-dashboard-report',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class DashboardReportComponent implements OnInit {
  reportFrmGroup: FormGroup;
  issueData = issueData;

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private router: Router,
              public campService: CampaignService) { }

  ngOnInit(): void {
    this.reportFrmGroup = this.fb.group({
      issueOpts: [null, Validators.required],
      additional: [null, Validators.required]
    });
  }
  backList(){
    const r = this.router.navigate(['panel/dashboard/home'] );
  }
  saveReport(){
    if (this.reportFrmGroup.value.issueOpts && this.reportFrmGroup.value.additional ) {
      document.querySelector('.report-wrapper form').classList.add('hide');
      document.querySelector('.report-success').classList.add('active');
    }
  }
}
