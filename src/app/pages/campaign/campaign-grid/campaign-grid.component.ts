import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Link } from '../../../../@vex/interfaces/link.interface';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../../@vex/animations/scale-fade-in.animation';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { trackById } from '../../../../@vex/utils/track-by';
import {ActivatedRoute, Data, Router} from '@angular/router';
import { map } from 'rxjs/operators';
import {Campaign} from '../interfaces/campaign.interface';
import icArrowDown from '@iconify/icons-ic/twotone-keyboard-arrow-down';
import {CampaignService} from '../../../providers/campaign.service';

import {DataService} from '../../../providers/data.service';

export interface ShowFilter {
  value: string;
  label: string;
}

@Component({
  selector: 'vex-campaign-grid',
  templateUrl: './campaign-grid.component.html',
  styleUrls: ['./campaign-grid.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class CampaignGridComponent implements OnInit, AfterViewChecked {
  icArrowDown = icArrowDown;
  links: Link[] = [
    {
      label: 'Storage',
      route: './',
      params: { filter: 'storage'}
    },
    {
      label: 'Archive',
      route: './',
      params: { filter: 'archive'}
    }
  ];

  filters: ShowFilter[] = [
    {value: 'all', label: 'Show All'},
    {value: 'instagram', label: 'Instagram'},
    {value: 'facebook', label: 'Facebook'},
    {value: 'tiktok', label: 'Tiktok'},
    {value: 'youtube', label: 'Youtube'}
  ];
  activeTab: string;
  curfilter: ShowFilter;
  trackById = trackById;
  campaigns: Campaign[];
  favorites: Campaign[] = [];

  filteredCampaigns$ = this.route.queryParamMap.pipe(
      map(paramMap => {
        this.activeTab = paramMap.get('filter');
        const show = paramMap.get('show') ? paramMap.get('show') : 'all';
        this.campaigns = show === 'all' ? this.campService.campList :
            this.campService.filter(show);


        switch (this.activeTab) {
          case 'storage': {
            // this.campaigns = show === 'all' ? this.campaigns.filter(c => !c.favorite) :
            //     this.campService.filter(show);
            this.campService.getAllCampaignListForInfluencer().then(status => {
              this.campaigns = this.campService.campList;
              console.log('######### : ', this.campaigns);
              this.cdr.detectChanges();
              return this.campaigns;
            });
          }

          case 'archive': {
            // this.favorites = this.campaigns.filter(c => c.favorite);
            // return this.favorites;
            this.campService.getFavoriteCampaignListForInfluencer().then(status => {
              this.favorites = this.campService.campFavoriteList;
              this.cdr.detectChanges();
              return this.favorites;
            });
          }

          default: {
            this.router.navigate(['panel/campaign/list'],
                { queryParams: { filter: 'storage' } } );
            return [];
          }
        }
        
      })
  );
  constructor(private route: ActivatedRoute,
              private router: Router,
              private cdr: ChangeDetectorRef,
              public campService: CampaignService,
              public dataService: DataService) {
    this.curfilter = this.filters[0];
    // this.campaigns = this.campService.campList;
    // this.campListInit();
  }

  campListInit() {
    this.campService.campList = [];
    this.dataService.getCampaignList()
    .pipe()
    .subscribe((cdata : any) => {
      for(let i = 0; i < cdata.results.length; i ++) {
        let camp : Campaign = {
          id: 2,
          name: 'Nike Running Shoes',
          category: ['fashion', 'travel', 'sports'],
          budget: 100,
          coverImg: 'assets/img/demo/product07-01.jpg',
          platform: ['instagram', 'facebook'],
          placement: ['feed', 'story'],
          requirement: 'test',
          caption: 'adf',
          tags: ['nike'],
          tags2: ['fashion'],
          ages: [30, 60],
          followers: [2000, 4500],
          periodStart: '09/02/2020',
          periodEnd: '09/09/2020',
          gallery: ['assets/img/demo/product07-02.jpg', 'assets/img/demo/product07-03.jpg', 'assets/img/demo/product07-04.jpg', '', ''],
          gender: 'male',
          city: '',
          country: '',
          quests: [1],
          contents: [2],
          langs: ['en'],
          billingName: '',
          billingAddress1: '',
          billingAddress2: '',
          billingState: '',
          billingCity: '',
          billingZipcode: '',
          description: 'Showing face, Picture wearing  a product',
          favorite: false,
        };

        camp.id           = cdata.results[i].campaign_uuid;
        // camp.budget       = cdata.results[i].budget;
        camp.name         = cdata.results[i].campaign_title;
        camp.description  = cdata.results[i].campaign_description;
        // camp.category     = cdata.results[i].category;
        camp.periodStart  = cdata.results[i].start_date;
        camp.periodEnd    = cdata.results[i].end_date;
        this.campaigns.push(camp);

        
      }
      this.campService.campList = this.campaigns;
    })
  }
  ngOnInit(): void {
    
  }
  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }
  openCampaign(id?: Campaign['id']) {
    const r = this.router.navigate(['panel/campaign/view/' + id]);
  }
  saveArchive(id?: Campaign['id']) {
    const campaign = this.campaigns.find(c => c.id === id);
    let added = false;
    if (this.favorites.length > 0){
      const index = this.favorites.findIndex(c => c.id === id);
      if (index !== -1) {
        const fp = this.favorites.find(c => c.id === id);
        fp.favorite = false;
        this.favorites.splice(index, 1);
      }else {
        campaign.favorite = true;
        this.favorites.push(campaign);
        added = true;
      }
    }else{
      campaign.favorite = true;
      this.favorites.push(campaign);
      added = true;
    }

    if (added) {
      const ide = this.campaigns.findIndex(c => c.id === id);
      this.campaigns.splice(ide, 1);
    }
  }
  editCampaign(id?: Campaign['id']) {
    const r = this.router.navigate(['panel/campaign/edit/' + id]);
  }
  deleteCampaign(id?: Campaign['id']) {
    this.dataService.deleteCampaign(id)
    .pipe()
    .subscribe(cdata => {
      this.campService.deleteCampaign(id);
      if (this.activeTab === 'storage') {
        const ide = this.campaigns.findIndex(c => c.id === id);
        this.campaigns.splice(ide, 1);
      }else{
        const ide = this.favorites.findIndex(c => c.id === id);
        this.favorites.splice(ide, 1);
    }
    })
    
  }

    setFilter(filter: ShowFilter) {
      this.curfilter = filter;
      const r = this.router.navigate(['panel/campaign/list'],
        { queryParams: { filter: this.activeTab , show: filter.value } } );
    }

}
