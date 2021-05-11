import {AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit, Renderer2} from '@angular/core';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignService} from '../../../providers/campaign.service';
import {UserService} from '../../../providers/user.service';
import {Campaign} from '../../campaign/interfaces/campaign.interface';
import {DOCUMENT} from '@angular/common';
import { DataService } from '../../../providers/data.service'

@Component({
  selector: 'vex-offer-pack',
  templateUrl: './offer-pack.component.html',
  styleUrls: ['./offer-pack.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class OfferPackComponent implements OnInit, AfterViewChecked {
  campaigns: Campaign[] = [];
  selCamps: Campaign[] = [];
  chatId: string;
  constructor(private route: ActivatedRoute,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2,
              private cd: ChangeDetectorRef,
              private router: Router,
              public campService: CampaignService,
              public userService: UserService,
              public dataService: DataService) {
  }
  ngAfterViewChecked(): void {
    this.renderer.addClass(this.document.querySelector('.campaign-grid-wrapper'), 'offer-pack');
  }

  ngOnInit(): void {
    this.campaigns = this.campService.campList;
    this.chatId = this.route.snapshot.paramMap.get('id');
  }
  openCampaign(id?: Campaign['id']) {
    this.router.navigate(['panel/campaign/view/' + id]);
  }
  addQueue(id?: Campaign['id']){
    const campaign = this.campaigns.find(c => c.id === id);
    let added = false;
    if (this.selCamps.length > 0){
      const index = this.selCamps.findIndex(c => c.id === id);
      if (index !== -1) {
        const fp = this.selCamps.find(c => c.id === id);
        fp.in_queue = false;
        this.selCamps.splice(index, 1);
      }else {
        campaign.in_queue = true;
        this.selCamps.push(campaign);
        added = true;
      }
    }else{
      campaign.in_queue = true;
      this.selCamps.push(campaign);
      added = true;
    }
  }
  sendOffer() {
    let newId = this.campService.offers.length;
    this.selCamps.forEach(c => {
      newId++;
      this.campService.offers.push({
        id: newId,
        chatId: Number(this.chatId),
        campId: c.id,
        status: 'pending',
      });
      c.in_queue = false;
    });
    this.renderer.removeClass(this.document.body, 'offer-pack');
    this.selCamps.length = 0;
    this.router.navigate(['panel/chat/' + this.chatId]);


    // const campaign = this.campaigns.find(c => c.id === Number(this.chatId));
    // this.dataService.sendOffer(campaign)
    // .pipe()
    // .subscribe(cdata => {
    //   console.log('send offer', cdata);
    // });
  }
}
