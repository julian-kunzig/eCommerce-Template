import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {Link} from '../../../../@vex/interfaces/link.interface';
import {ShowFilter} from '../campaign-grid/campaign-grid.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {debounceTime, map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignService} from '../../../providers/campaign.service';
import {MatDialog} from '@angular/material/dialog';
import {AlertDialogComponent, FilterOption, SaveListDialogComponent} from '../../discover/discover-grid/discover-grid.component';
import icArrowDown from '@iconify/icons-ic/twotone-keyboard-arrow-down';
import {Campaign} from '../interfaces/campaign.interface';
import { trackById } from '../../../../@vex/utils/track-by';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {Profile} from '../interfaces/profile.interface';
import {Options} from 'ng5-slider';
import {UserService} from '../../../providers/user.service';
import { DataService } from '../../../providers/data.service';
import { Observable } from 'rxjs-compat/Observable';

@Component({
  selector: 'vex-influencer-grid',
  templateUrl: './influencer-grid.component.html',
  styleUrls: ['./influencer-grid.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class InfluencerGridComponent implements OnInit, AfterViewChecked {
  links: Link[] = [
    {
      label: 'All',
      route: './',
      params: { filter: 'all'}
    },
    {
      label: 'Favorited',
      route: './',
      params: { filter: 'favorited'}
    },
    {
      label: 'My List',
      route: './',
      params: { filter: 'mylist'}
    }
  ];
  activeTab: string;
  curfilter: ShowFilter;
  searchCtrl = new FormControl();
  searchStr$ = this.searchCtrl.valueChanges.pipe(
      debounceTime(10)
  ).subscribe((data) => {
    if (data) {
      this.router.navigate(['panel/inf_discover/list'],
          { queryParams: { filter: 'all', search: data } } );
    }else{
      this.router.navigate(['panel/inf_discover/list'],
          { queryParams: { filter: 'all' } } );
    }
  });
  applyFilter = false;
  icArrowDown = icArrowDown;
  filteropt: FilterOption;
  filters: ShowFilter[] = [
    {value: 'popular', label: 'Most Popular'},
    {value: 'recent', label: 'Most Recent'},
    {value: 'follower', label: 'Follower count'},
    {value: 'alphabetic', label: 'A-Z descending'},
  ];

  campaigns: Campaign[];
  favorites: Campaign[] = [];
  trackById = trackById;

  myCampSource = new MatTableDataSource<Campaign>();
  clistVColumns: string[] = ['id', 'image', 'name', 'platform', 'period', 'delete'];
  cselection = new SelectionModel<Campaign>(true, []);

  private myCampPaginator: MatPaginator;
  advfilterForm: FormGroup;

  @ViewChild('myCampPaginator') set matPaginator(mp: MatPaginator) {
    this.myCampPaginator = mp;
    this.myCampSource.paginator = this.myCampPaginator;
  }
  doptions: Options = {
    floor: 1000,
    ceil: 10000,
    showSelectionBar: true,
    selectionBarGradient: {
      from: '#CD229C',
      to: '#F36A4E'
    },
    translate: (value: number): string => {
      return this.translateFollowerLabel(value);
    }
  };
  aoptions: Options = {
    floor: 0,
    ceil: 99,
    showSelectionBar: true,
    selectionBarGradient: {
      from: '#CD229C',
      to: '#F36A4E'
    }
  };
  foptions: Options = {
    floor: 1000,
    ceil: 10000,
    showSelectionBar: true,
    selectionBarGradient: {
      from: '#CD229C',
      to: '#F36A4E'
    },
    translate: (value: number): string => {
      return this.translateFollowerLabel(value);
    }
  };
  proposalTxt: string;
  // filteredCampaigns$ = this.route.queryParamMap.pipe(
  //     map(paramMap => {
  //       this.activeTab = paramMap.get('filter');
  //       const show = paramMap.get('show') ? paramMap.get('show') : 'all';
  //       this.campaigns = show === 'all' ? this.campService.campList :
  //           this.campService.filter(show);

  //       switch (this.activeTab) {
  //         case 'all': {
  //           this.campaigns = show === 'all' ? this.campaigns.filter(c => !c.favorite) :
  //               this.campService.filter(show);
  //           return this.campaigns;
  //         }

  //         case 'favorited': {
  //           this.favorites = this.campaigns.filter(c => c.favorite);
  //           return this.favorites;
  //         }

  //         case 'mylist': {
  //           this.cselection.clear();
  //           this.myCampSource.data.forEach(row => this.cselection.select(row));
  //           return [];
  //         }

  //         default: {
  //           this.router.navigate(['panel/inf_discover/list'],
  //               { queryParams: { filter: 'all' } } );
  //           return [];
  //         }
  //       }
  //     })
  // );
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private cdr: ChangeDetectorRef,
              public campService: CampaignService,
              public userService: UserService,
              public dialog: MatDialog) {
    this.curfilter = this.filters[0];
    this.filteropt = {
      platform: [],
      category: [],
      country: '',
      city: '',
      distance: [1000, 10000],
      age: [0, 99],
      follower: [1000, 10000],
      gender: 'any',
    };
  }

  ngOnInit(): void {
    this.advfilterForm = this.fb.group({
      country: [null],
      city: [null],
      gender: [null],
    });

    this.loadCampaignListForInfluencer();
  }

  loadCampaignListForInfluencer() {
    this.route.queryParams.subscribe(query => {
      this.activeTab = query.filter;
      this.campaigns = [];
      this.favorites = [];
      this.myCampSource.data = [];

      switch (this.activeTab){
        case 'all': {
          this.campService.getAllCampaignListForInfluencer().then(status => {
            this.campaigns = this.campService.campList;
            // console.log(this.campaigns,'1111')
            this.cdr.detectChanges();
          });
          break;
        }
        case 'favorited': {
          this.campService.getFavoriteCampaignListForInfluencer().then(status => {
            this.favorites = this.campService.campFavoriteList;
            // console.log(this.favorites,'2222')
            this.cdr.detectChanges();
          });
          break;
        }
        case 'mylist': {
          this.campService.getMyListCampaignListForInfluencer().then(status => {
            this.myCampSource.data = this.campService.myCampList;
            this.cselection.clear();
            this.myCampSource.data.forEach(row => this.cselection.select(row));
            // console.log(this.campService.myCampList,'333')
            this.cdr.detectChanges();
          });
          break;
        }
        default: {
          this.router.navigate(['panel/inf_discover/list'], { queryParams: { filter: 'all' } } );
          this.campaigns = [];
          break;
        }
      }
    });
  }

  // ngAfterViewInit(){
  //   this.campService.campInit().then(status=>{
  //     console.log(this.myCampSource.data,this.campService.myCampList)
  //     this.myCampSource.data = this.campService.myCampList;
  //     this.cdr.detectChanges()

  //     this.filteredCampaigns$ =  this.route.queryParamMap.pipe(
  //       map(paramMap => {
  //         this.activeTab = paramMap.get('filter');
  //         const show = paramMap.get('show') ? paramMap.get('show') : 'all';
  //         this.campaigns = show === 'all' ? this.campService.campList :
  //             this.campService.filter(show);

  //         switch (this.activeTab) {
  //           case 'all': {
  //             this.campaigns = show === 'all' ? this.campaigns.filter(c => !c.favorite) :
  //                 this.campService.filter(show);
  //             return this.campaigns;
  //           }

  //           case 'favorited': {
  //             this.favorites = this.campaigns.filter(c => c.favorite);
  //             return this.favorites;
  //           }

  //           case 'mylist': {
  //             this.cselection.clear();
  //             this.myCampSource.data.forEach(row => this.cselection.select(row));
  //             return [];
  //           }

  //           default: {
  //             this.router.navigate(['panel/inf_discover/list'],
  //                 { queryParams: { filter: 'all' } } );
  //             return [];
  //           }
  //         }
  //       }))
  //   })
  // }
  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }
  get categories() {
    return this.campService.categories;
  }
  get platforms() {
    return this.campService.platforms;
  }
  get states() {
    return this.campService.states;
  }
  get cities() {
    return this.campService.cities;
  }
  translateFollowerLabel(value: number, step: number = 1000): string {
    const num = step >= 1000 ? value / step : value;
    if (num.toString().split('.').length > 1) {
      return num.toFixed(1) +  (step >= 1000 ? 'K' : '');
    }else{
      return num + (step >= 1000 ? 'K' : '');
    }
  }
  openFilter() {
    const wrapper = document.querySelectorAll('.filter-toolbar')[0];
    wrapper.classList.toggle('opened-filter');
    const body = document.querySelectorAll('body')[0];
    body.classList.toggle('opened');
  }
  closeFilter() {
    const wrapper = document.querySelectorAll('.filter-toolbar')[0];
    wrapper.classList.remove('opened-filter');
    const body = document.querySelectorAll('body')[0];
    body.classList.remove('opened');
  }
  saveFilter(){
    this.closeFilter();
    this.applyFilter = true;
    this.campService.filterOpt = this.filteropt;
    // const r = this.router.navigate(['panel/inf_discover/list'],
    //     { queryParams: { filter: 'all' , sort: this.curfilter.value, advanced: true } } );
  }
  resetFilter() {
    this.applyFilter = false;
    this.advfilterForm.reset();
    this.filteropt.distance = [1000, 10000];
    this.filteropt.age = [0, 99];
    this.filteropt.follower = [1000, 10000];
    this.filteropt.category.length = 0;
    this.filteropt.platform.length = 0;
    this.campService.filterOpt = this.filteropt;
  }
  setFilter(filter: ShowFilter) {
    this.curfilter = filter;
    const r = this.router.navigate(['panel/inf_discover/list'],
        { queryParams: { filter: this.activeTab , sort: filter.value } } );
  }
  openCampaign(id?: Campaign['id']) {
    const r = this.router.navigate(['panel/campaign/view/' + id]);
  }
  addTolist(id?: Campaign['id']) {
    let index = this.campService.myCampList.findIndex(c => c.id === id);

    if (index === -1) {
      index = this.campaigns.findIndex(c => c.id === id);
      this.campService.myCampList.push(this.campaigns[index]);
      return true;
    }

    return false;
  }

  saveMylist(id?: Campaign['id']) {
    const my_list_id = this.campService.campaignMyListId;
    this.campService.saveCampaignToMyList(my_list_id, id);

    const res = this.addTolist(id);
    const dialogRef = this.dialog.open(SaveListDialogComponent, {
      data: {
        result: res,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.campaigns = [...this.campaigns.filter(item => {
        return item.id !== id;
      })];
    });
  }
  saveArchive(id?: Campaign['id']) {
    // console.log("campaign_uuid", id);
    const favorite_id = this.campService.campaignFavoriteListId;

    let added = false;
    if (this.favorites.length > 0){
      const index = this.favorites.findIndex(c => c.id === id);
      if (index !== -1) {
        this.campService.removeCampaignFromCampaignFavorites(favorite_id, id );

        const fp = this.favorites.find(c => c.id === id);
        fp.favorite = false;
        this.favorites.splice(index, 1);
      }else {
        this.campService.saveCampaignToFavorites(favorite_id, id );
        const campaign = this.favorites.find(c => c.id === id);
        if (campaign){
          campaign.favorite = true;
          this.favorites.push(campaign);
          added = true;
        }
        this.campaigns = [...this.campaigns.filter(item => {
          return item.id !== id;
        })];
      }
    }else{
      this.campService.saveCampaignToFavorites(favorite_id, id );
      const campaign = this.campaigns.find(c => c.id === id);
      campaign.favorite = true;
      this.favorites.push(campaign);
      added = true;
      this.campaigns = [...this.campaigns.filter(item => {
        return item.id !== id;
      })];
    }

    // if (added) {
    //   const ide = this.campaigns.findIndex(c => c.id === id);
    //   this.campaigns.splice(ide, 1);
    // }
  }

  editCampaign(id?: Campaign['id']) {
    const r = this.router.navigate(['panel/campaign/edit/' + id]);
  }
  deleteCampaign(id?: Campaign['id']) {
    this.campService.deleteCampaign(id);
    if (this.activeTab === 'all') {
      const ide = this.campaigns.findIndex(c => c.id === id);
      this.campaigns.splice(ide, 1);
    }else{
      const ide = this.favorites.findIndex(c => c.id === id);
      this.favorites.splice(ide, 1);
    }
  }
  iscAllSelected() {
    const numSelected = this.cselection.selected.length;
    const numRows = this.myCampSource.data.length;
    return numSelected === numRows;
  }
  cmasterToggle() {
    this.iscAllSelected() ?
        this.cselection.clear() :
        this.myCampSource.data.forEach(row => this.cselection.select(row));
  }
  ccheckboxLabel(row?: Campaign): string {
    if (!row) {
      return `${this.iscAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.cselection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  deleteFromList(id?: Campaign['id']) {
    const my_list_id = this.campService.campaignMyListId;
    this.campService.removeCampaignFromMyList(my_list_id, id );

    this.cselection.deselect(this.campService.myCampList.find(c => c.id === id));
    const index = this.campService.myCampList.findIndex(c => c.id === id);
    this.campService.myCampList.splice(index, 1);
    this.myCampSource.data = this.campService.myCampList;
  }
  backList(){
    this.router.navigate(['/panel/inf_discover/list'],
        { queryParams: { filter: 'all' } } );
  }
  sendProposal(){
    if (!this.cselection.selected.length){
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: {
          msg: 'Please select the campaign to send the offer.'
        }
      });
    }else{
      let newId = this.campService.proposals.length;
      this.cselection.selected.forEach(c => {
        newId++;
        this.campService.proposals.push({
          id: newId,
          userId: this.userService.currentUser.userId,
          campId: c.id,
          description: this.proposalTxt,
          status: 'pending',
        });
      });
      this.router.navigate(['panel/chat/' + this.userService.currentUser.userId]);
    }
  }
}
