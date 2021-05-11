import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignService, Offer} from '../../../providers/campaign.service';
import {UserService} from '../../../providers/user.service';
import {Profile} from '../../campaign/interfaces/profile.interface';
import {Campaign} from '../../campaign/interfaces/campaign.interface';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';

@Component({
  selector: 'vex-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class OfferPreviewComponent implements OnInit {
  offer: Offer;
  profile: Profile;
  campaign: Campaign;
  dispNegotiate = false;
  negotiateTxt: string;

  constructor(private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private router: Router,
              public campService: CampaignService,
              public userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.offer = this.campService.offers.find(c => c.id === Number(id));
    this.campaign = this.campService.campList.find( c => c.id === this.offer.campId );
    this.profile = this.campService.profiles.find(elem => elem.id === this.offer.profile_id);
  }
  backOfferView(){
    const r = this.router.navigate(['panel/offer/view/' + this.offer.id] );
  }
  reqNegotiate(){
    this.dispNegotiate = !this.dispNegotiate;
  }
  reqChange() {
    this.offer.editable = true;
    const r = this.router.navigate(['panel/offer/list'], { queryParams: { filter: 'current' } } );
  }
}
