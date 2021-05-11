import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignService, Offer} from '../../../providers/campaign.service';
import {UserService} from '../../../providers/user.service';
import {Profile} from '../../campaign/interfaces/profile.interface';
import {Campaign} from '../../campaign/interfaces/campaign.interface';

@Component({
  selector: 'vex-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class OfferEditComponent implements OnInit {
  offer: Offer;
  profile: Profile;
  campaign: Campaign;
  offerform: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private router: Router,
              public campService: CampaignService,
              public userService: UserService) {
    this.offerform = this.fb.group({
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.offer = this.campService.offers.find(c => c.id === Number(id));
    this.campaign = this.campService.campList.find( c => c.id === this.offer.campId );
    this.profile = this.campService.profiles.find(elem => elem.id === this.offer.profile_id);
  }
  backList(){
    const r = this.router.navigate(['panel/inf_discover/list'],
        { queryParams: { filter: 'all' } } );
  }
  saveOffer() {
    this.offer.editable = true;
    const r = this.router.navigate(['panel/chat/' + this.offer.profile_id] );
  }
}
