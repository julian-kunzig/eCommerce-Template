import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Link} from '../../../../@vex/interfaces/link.interface';
import {map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {Campaign} from '../../campaign/interfaces/campaign.interface';
import {DatePipe} from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignService, Offer} from '../../../providers/campaign.service';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {UserService} from '../../../providers/user.service';
import {DataService} from '../../../providers/data.service';

@Component({
  selector: 'vex-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class OfferListComponent implements OnInit {
  links: Link[] = [
    {
      label: 'Current',
      route: './',
      params: { filter: 'current'}
    },
    {
      label: 'Pending',
      route: './',
      params: { filter: 'pending'}
    },
    {
      label: 'Fulfilled',
      route: './',
      params: { filter: 'fulfilled'}
    }
  ];
  activeTab: string; // defines which tab we're in
  offers: Offer[];
  
  filteredOffers$ = this.route.queryParamMap.pipe(
    map(paramMap => {
      this.activeTab = paramMap.get('filter');
      switch (this.activeTab) {
        case 'current': {
          this.myOfferSource.data = this.campService.offers.filter(x => x.type === 'current');
          return this.myOfferSource.data;
        }
        case 'pending': {
          this.myOfferSource.data = this.campService.offers.filter(x => x.type === 'pending');
          return this.myOfferSource.data;
        }
        case 'fulfilled': {
          this.myOfferSource.data = this.campService.offers.filter(x => x.type === 'fulfilled');
          return this.myOfferSource.data;
        }
        default: {
          this.router.navigate(['panel/offer/list'],
              { queryParams: { filter: 'current' } } );
          return [];
        }
      }
    }
  ));
  
  myOfferSource = new MatTableDataSource<Offer>();
  clistVColumns: string[] = ['campaign', 'budget', 'accepted_date', 'view']; // 'progress',

  private myOfferPaginator: MatPaginator;

  @ViewChild('myCampPaginator') set matPaginator(mp: MatPaginator) {
    this.myOfferPaginator = mp;
    this.myOfferSource.paginator = this.myOfferPaginator;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private userService: UserService,
              public campService: CampaignService,
              public dataService: DataService) {

  }

  ngOnInit(): void {
    this.loadOfferList();
  }

  ngAfterViewInit(){
    
  }

  loadOfferList() {
    this.campService.offersInit().then(status => {
      this.cdr.detectChanges();

      this.filteredOffers$ = this.route.queryParamMap.pipe(
        map(paramMap => {
          this.activeTab = paramMap.get('filter');
          switch (this.activeTab) {
            case 'current': {
              this.myOfferSource.data = this.campService.offers.filter(x => x.type === 'current');

              return this.myOfferSource.data;
            }
            case 'pending': {
              this.myOfferSource.data = this.campService.offers.filter(x => x.type === 'pending');

              return this.myOfferSource.data;
            }
            case 'fulfilled': {
              this.myOfferSource.data = this.campService.offers.filter(x => x.type === 'fulfilled');
              return this.myOfferSource.data;
            }
            default: {
              this.router.navigate(['panel/offer/list'],
                  { queryParams: { filter: 'current' } } );
              return [];
            }
          }
        }
      ));
    });
  }

  viewDetail(campId) {    
    console.log('viewDetail offer', campId);
    const offer = this.campService.offers.find(elem => elem.campId == campId); // poor practice of repeating same unique && elem.type === 'pending'
    console.log('viewDetail', offer);
    const type = localStorage.getItem('type');
    if (type === 'advertiser') {
      // this.dataService.getSpecificAdvertiserOffer(offer.id)
      // .pipe()
      // .subscribe((cdata : any) => {
      //   console.log('specific offer', cdata);
      //   const r = this.router.navigate(['panel/offer/progress/' + offer.id ]);
      // })
      this.campService.getAllInfluencerListForBrand().then(status => {
        this.router.navigate(['panel/offer/progress/' + offer.id ]); 
      })
    }
    else {
      // this.dataService.getSpecificInfluencerOffer(offer.id)
      // .pipe()
      // .subscribe((cdata : any) => {
      //   console.log('specific offer', cdata);
      //   const r = this.router.navigate(['panel/offer/progress/' + offer.id ]);
      // }) 
      this.campService.getAllCampaignListForInfluencer().then(status => {
        this.router.navigate(['panel/offer/progress/' + offer.id ]);
      })
    }
    // const offer = this.campService.offers.find(elem => elem.campId == campId && elem.chatId == this.userService.currentUser.userId);
    
  }
  
  formateDate(campId) {
    const offer = this.campService.offers.find(elem => elem.campId == campId);
    const dp: DatePipe = new DatePipe('en-US');
    if (offer.accept_date) {
      return  dp.transform(new Date(offer.accept_date), 'MM.dd.yyyy');
    }
    return '';
  }
  // progressLabel(status) {
  //   switch (status) {
  //     case 'pending': {
  //       return 'Pending';
  //     }
  //     case 'sent': {
  //       return 'Sent product';
  //     }
  //     case 'active': {
  //       return 'Active';
  //     }
  //     case 'completed': {
  //       return 'Fulfilled';
  //     }
  //   }
  // }
}
