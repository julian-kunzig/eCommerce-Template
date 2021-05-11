import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../campaign/interfaces/campaign.interface';
import {CampaignService, Offer} from '../../../providers/campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {UserService} from '../../../providers/user.service';

@Component({
  selector: 'vex-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class OfferViewComponent implements OnInit {
  campaign: Campaign;
  offer: Offer;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public userService: UserService,
              public campService: CampaignService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.offer = this.campService.offers.find(c => c.id === Number(id));
    this.campaign = this.campService.getCampaignList().find(c => c.id === Number(this.offer.campId));
  }
  backList(){
    const r = this.router.navigate(['panel/campaign/list'],
        { queryParams: { filter: 'storage' } } );
  }
  declineOffer(){
    this.offer.status = 'declined';
    const r = this.router.navigate(['panel/chat/' + this.offer.chatId ]);
  }
  acceptOffer(){
    this.offer.status = 'accepted';
  }
  offerPreview(){
    const r = this.router.navigate(['panel/offer/preview/' + this.offer.id ]);
  }
  translateFollowerLabel(value: number): string {
    const num = value / 1000;
    if (num.toString().split('.').length > 1) {
      return num.toFixed(1) +  'K';
    }else{
      return num + 'K';
    }
  }
}
