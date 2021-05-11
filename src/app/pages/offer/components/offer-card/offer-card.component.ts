import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CampaignService, Offer} from '../../../../providers/campaign.service';
import {Campaign} from '../../../campaign/interfaces/campaign.interface';
import {scaleIn400ms} from '../../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../../@vex/animations/scale-fade-in.animation';

@Component({
  selector: 'vex-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class OfferCardComponent implements OnInit {
  campaign: Campaign;
  @Input() inputOffer: Offer;
  @Output() openOffer = new EventEmitter<Offer['id']>();

  constructor(public campService: CampaignService) { }

  ngOnInit(): void {
    this.campaign = this.campService.getCampaignList().find(c => c.id === Number(this.inputOffer.campId));
  }

}
