import { Component, OnInit } from '@angular/core';
import { Campaign } from '../interfaces/campaign.interface';
import { CampaignService } from '../../../providers/campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {UserService} from '../../../providers/user.service';

import {DataService} from '../../../providers/data.service';

import {ctData, qaData} from '../../../../static-data/questions';

@Component({
  selector: 'vex-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class CampaignViewComponent implements OnInit {
  campaign: Campaign;

  requirement_display: string;

  influencers = qaData;
  contentdata = ctData;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      public userService: UserService,
      public campService: CampaignService,
      public dataService: DataService) { 
        
      }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.campaign = this.campService.getCampaignList().find(c => c.id == id);
    // console.log('click campaign item', id, this.campaign, this.campService.getCampaignList());
    this.dataService.getCampaign(id)
    .pipe()
    .subscribe((cdata : any) => {
      this.campaign.budget        = cdata.budget;
      this.campaign.requirement   = cdata.requirements;
      this.campaign.tags2          = cdata.tags.split(' ');
      this.campaign.locationtags  = cdata.location_tags.split(' ');
      // console.log('camp gallery', this.campaign.gallery);
      this.campaign.gallery       = cdata.images;
      // this.displayRequirement();  
    });
      
  }
  displayRequirement() {
    let req: string;
    // console.log('infquest =>', this.influencers );
    this.influencers.forEach(it => {
      if(it.completed == true)
      {
        req = it.question;
        if(it.sub_quetions)
        {
          it.sub_quetions.forEach(sit => {
            if(sit.completed)
              req = req + '\n' + '\u00A0\u00A0\u00A0\u00A0' + '○ ' + sit.question;
          })
        }        
      }
    })
    this.requirement_display = '○ ' + this.campaign.requirement + '\n' + '○ ' + this.contentdata[this.campaign.contents[0] - 1].question + '\n' + '○ ' + req;
  }
  backList(){
    if (this.userService.currentUser.type === 'influencer') {
      this.router.navigate(['/panel/inf_discover/list'],
          { queryParams: { filter: 'all' } } );
    }else {
      const r = this.router.navigate(['/panel/campaign/list'],
          { queryParams: { filter: 'storage' } } );
    }
  }
  translateFollowerLabel(value: number): string {
    const num = value / 1000;
    if (num.toString().split('.').length > 1) {
      return num.toFixed(1) +  'K';
    }else{
      return num + 'K';
    }
  }
  editCampaign(){
    const r = this.router.navigate(['/panel/campaign/edit/' + this.campaign.id] );
  }
  openAdvertiser(){
    this.userService.afterLogin('advertiser');
    const r = this.router.navigate(['/panel/user/view'] );
  }
  addList() {
    this.campService.addtoCamp(this.campaign.id);
    this.router.navigate(['/panel/inf_discover/list'],
        { queryParams: { filter: 'mylist' } } );
  }
}
