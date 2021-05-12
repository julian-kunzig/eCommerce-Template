import {ChangeDetectorRef, Component, HostListener, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import {SwiperOptions} from 'swiper';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {Campaign} from '../../campaign/interfaces/campaign.interface';
import {CampaignService, Offer, Proposal} from '../../../providers/campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../providers/user.service';
import {Profile} from '../../campaign/interfaces/profile.interface';
import {DataService} from '../../../providers/data.service';
import {AuthenticationService} from '../../../providers/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'vex-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss', '../../../../../node_modules/swiper/swiper-bundle.min.css'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class DashboardHomeComponent implements OnInit, AfterViewInit {
  campaigns: Campaign[] = [];
  offers: Offer[] = [];
  proposals: Proposal[] = [];
  trendInfs: Profile[] = [];
  recomInfs: Profile[] = [];
  recenInfs: Profile[] = [];
  popularInfs: Profile[] = [];

  trendCamps: Campaign[] = [];
  recomCamps: Campaign[] = [];
  recenCamps: Campaign[] = [];
  popularCamps: Campaign[] = [];

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    spaceBetween: 15,
    // autoHeight: true,
    allowTouchMove: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
    breakpoints: {
      1440: {
        slidesPerView: 5
      },
      1024: {
        slidesPerView: 4
      },
      992: {
        slidesPerView: 3
      },
      767: {
        slidesPerView: 3
      },
      480: {
        slidesPerView: 1
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: false
  };
  sconfig: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    // autoHeight: true,
    allowTouchMove: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 1
      },
      767: {
        slidesPerView: 1
      },
      480: {
        slidesPerView: 1
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: false
  };
  constructor(
              public campService: CampaignService,
              public userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef,
              private authenticationService: AuthenticationService) {

  }

  getReviews(id){
    return this.campService.reviews.filter(c => c.profile_id === id);
  }
  calcRatingWidth(id) {
    const width = Number(this.calcRating(id)) * 20;
    return width;
  }
  calcRating(id) {
    const reviews = this.getReviews(id);
    if (reviews) {
      let sum = 0;
      reviews.forEach(c => {
        sum = sum + c.rating;
      });

      const avg = (sum / reviews.length).toFixed(1);
      return avg;
    }
  }

  ngAfterViewInit() {
  }

  ngOnInit(){
    const type = localStorage.getItem('type');
    if (type === 'advertiser') {
      this.campService.getAllInfluencerListForBrand().then(status => {
        this.trendInfs = this.campService.profiles;
        this.recomInfs = this.campService.profiles;
        const recentIds = [2, 3, 4];
        this.recenInfs = this.campService.profiles.filter(e => recentIds.includes(e.id));
        const popularIds = [5, 6, 8];
        this.popularInfs = this.campService.profiles.filter(e => popularIds.includes(e.id));
      });
    } else {
      this.campService.getAllCampaignListForInfluencer().then(status => {
        this.campaigns = this.campService.campList;
      });
    }
    
    this.offers = this.campService.offers.filter(e => e.status === 'pending');
    this.proposals = this.campService.proposals.filter(e => e.status === 'pending');
    
  }

}
