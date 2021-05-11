import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CampaignService} from '../../../providers/campaign.service';
import {UserService} from '../../../providers/user.service';
import {pdfsData} from '../../../../static-data/profiles';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';

export interface DisclosurePDF {
  id: number;
  doc_title: string;
  path: string;
}

@Component({
  selector: 'vex-disclosure',
  templateUrl: './disclosure.component.html',
  styleUrls: ['./disclosure.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class DisclosureComponent implements OnInit {

  pdfs: DisclosurePDF[] = pdfsData;
  currentDoc: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public campService: CampaignService,
              public userService: UserService) {
    this.currentDoc = this.pdfs[0].path;
  }
  browseDoc(path) {
    this.currentDoc = path;
  }
  ngOnInit(): void {
  }

}
