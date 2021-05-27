import {
    AfterViewChecked,
    ChangeDetectorRef,
    Component,
    Inject,
    ViewChild,
    OnInit,
    AfterViewInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {Link} from '../../../../@vex/interfaces/link.interface';
import {debounceTime, map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignService} from '../../../providers/campaign.service';
import {DataService} from '../../../providers/data.service';
import {UserService} from '../../../providers/user.service';
import icArrowDown from '@iconify/icons-ic/twotone-keyboard-arrow-down';
import icWarning from '@iconify/icons-ic/twotone-warning';
import {ShowFilter} from '../../campaign/campaign-grid/campaign-grid.component';
import { trackById } from '../../../../@vex/utils/track-by';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Options} from 'ng5-slider';
import {Profile} from '../../campaign/interfaces/profile.interface';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Campaign} from '../../campaign/interfaces/campaign.interface';
import {MatPaginator} from '@angular/material/paginator';
import { chats } from '../../../../static-data/chats';
import { Chat } from '../../chat/chat.component';
import { DateTime } from 'luxon';

export interface FilterOption {
    platform?: string[];
    category?: string[];
    country?: string;
    city?: string;
    age?: number[];
    distance?: number[];
    gender?: string;
    follower?: number[];
    price?: number[];
}

@Component({
  selector: 'vex-savelist-dialog',
  templateUrl: 'savelist-dialog.component.html',
})
export class SaveListDialogComponent {
  constructor(private dialogRef: MatDialogRef<DiscoverGridComponent>, @Inject(MAT_DIALOG_DATA) public data: { result: boolean }) {}
  close() {
    this.dialogRef.close();
  }
}

@Component({
    selector: 'vex-alert-dialog',
    templateUrl: 'alert-dialog.component.html',
})
export class AlertDialogComponent {
    icWarning = icWarning;
    constructor(private dialogRef: MatDialogRef<DiscoverGridComponent>, @Inject(MAT_DIALOG_DATA) public data: { msg: string }) {}
    close() {
        this.dialogRef.close();
    }
}

@Component({
  selector: 'vex-discover-grid',
  templateUrl: './discover-grid.component.html',
  styleUrls: ['./discover-grid.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class DiscoverGridComponent implements OnInit, AfterViewChecked {
      filteropt: FilterOption;
      advfilterForm: FormGroup;
      applyFilter = false;
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
        // {
        //   label: 'My List',
        //   route: './',
        //   params: { filter: 'mylist'}
        // }
      ];
      activeTab: string;
      icArrowDown = icArrowDown;
      curfilter: ShowFilter;
      trackById = trackById;
      filters: ShowFilter[] = [
        {value: 'popular', label: 'Most Popular'},
        {value: 'recent', label: 'Most Recent'},
        {value: 'follower', label: 'Follower count'},
        {value: 'alphabetic', label: 'A-Z descending'},
      ];
      searchCtrl = new FormControl();
      searchStr$ = this.searchCtrl.valueChanges.pipe(
        debounceTime(10)
      ).subscribe((data) => {
          if (data) {
              this.router.navigate(['panel/discover/list'],
                  { queryParams: { filter: 'all', search: data } } );
          }else{
              this.router.navigate(['panel/discover/list'],
                  { queryParams: { filter: 'all' } } );
          }
      });

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
      poptions: Options = {
        floor: 0,
        ceil: 100,
        showSelectionBar: true,
        selectionBarGradient: {
          from: '#CD229C',
          to: '#F36A4E'
        },
        translate: (value: number): string => {
          return this.translateFollowerLabel(value, 100);
        }
      };
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

      profiles: Profile[];

      mylistVColumns: string[] = ['id', 'image', 'name', 'platform', 'followers', 'price', 'hotness', 'delete'];
      mylistSource = new MatTableDataSource<Profile>(this.campService.myList);
      mselection = new SelectionModel<Profile>(true, []);

      myCampSource = new MatTableDataSource<Campaign>();
      clistVColumns: string[] = ['id', 'image', 'name', 'platform', 'period'];
      cselection = new SelectionModel<Campaign>(true, []);

      private myCampPaginator: MatPaginator;
      private myListPaginator: MatPaginator;

      @ViewChild('myCampPaginator') set matPaginator(mp: MatPaginator) {
        this.myCampPaginator = mp;
        this.myCampSource.paginator = this.myCampPaginator;
      }
      @ViewChild('myListPaginator') set listPaginator(mp: MatPaginator) {
        this.myListPaginator = mp;
        this.mylistSource.paginator = this.myListPaginator;
      }

      favorites: Profile[];

      // filteredDiscover$ = this.route.queryParamMap.pipe(
      //     map(paramMap => {
      //       this.activeTab = paramMap.get('filter');

      //       const sorting = paramMap.get('sort') ? paramMap.get('sort') : 'popular';
      //       const searchStr = paramMap.get('search');
      //       const advanced = paramMap.get('advanced');
      //       this.campService.sortProfiles(sorting);
      //       if (searchStr) {
      //           this.profiles = this.campService.profiles.filter(c => {
      //               return c.name.indexOf(searchStr) !== -1 ? true : false;
      //           });
      //       }else{
      //           this.profiles = this.campService.profiles;
      //       }
      //       this.favorites = this.profiles.filter(c => c.favorited);

      //       switch (this.activeTab) {
      //         case 'all': {
      //             return this.profiles.filter(c => !c.favorited);
      //         }
      //         case 'favorited': {
      //             return this.favorites;
      //         }
      //         case 'mylist': {
      //           this.mselection.clear();
      //           this.mylistSource.data.forEach(row => this.mselection.select(row));
      //           return [];
      //         }
      //         default: {
      //           this.router.navigate(['panel/discover/list'],
      //               { queryParams: { filter: 'all' } } )
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
                  public dialog: MatDialog,
                  public dataService: DataService,
                  public userService: UserService) {
        this.curfilter = this.filters[0];
        this.filteropt = {
            platform: [],
            category: [],
            country: '',
            city: '',
            distance: [1000, 10000],
            age: [0, 99],
            follower: [1000, 10000],
            price: [0, 100],
            gender: 'any',
        };
        this.myCampSource.data = this.campService.campList;
      }
      get categories() {
        return this.campService.categories;
      }
      get platforms() {
        return this.campService.platforms;
      }
      get countries() {
        return this.campService.countries;
      }
      get states() {
        return this.campService.states;
      }
      get cities() {
        return this.campService.cities;
      }

      ngOnInit(): void {
        this.advfilterForm = this.fb.group({
            country: [null],
            city: [null],
            gender: [null],
        });

        this.loadInfluencerListForBrand();
      }

  loadInfluencerListForBrand() {
    this.route.queryParams.subscribe(query => {
      this.activeTab = query.filter;
      this.profiles = [];
      this.favorites = [];
      this.mylistSource.data = [];

      switch (this.activeTab){
        case 'all': {
          this.campService.getAllInfluencerListForBrand().then(status => {
            this.profiles = this.campService.profiles;
            // console.log(this.profiles,'1111')
            this.cdr.detectChanges();
          });
          break;
        }
        case 'favorited': {
          this.campService.getFavoriteInfluencerListForBrand().then(status => {
            this.favorites = this.campService.favoriteProfiles;
            // console.log(this.favorites,'2222')
            this.cdr.detectChanges();
          });
          break;
        }
        case 'mylist': {
          this.campService.getMyListInfluencerListForBrand().then(status => {
            this.mylistSource.data = this.campService.myList;
            this.mselection.clear();
            this.mylistSource.data.forEach(row => this.mselection.select(row));
            // console.log(this.campService.myList,'333')
            this.cdr.detectChanges();
          });
          break;
        }
        default: {
          this.router.navigate(['panel/discover/list'], { queryParams: { filter: 'all' } } );
          break;
        }
      }
    });
  }

      // ngAfterViewInit() {
      //   this.campService.influencersListInit().then(status => {
      //     this.mylistSource.data = this.campService.myList;
      //     console.log(this.campService.myList)
      //     this.filteredDiscover$ = this.route.queryParamMap.pipe(
      //       map(paramMap => {
      //         this.activeTab = paramMap.get('filter');

      //         const sorting = paramMap.get('sort') ? paramMap.get('sort') : 'popular';
      //         const searchStr = paramMap.get('search');
      //         const advanced = paramMap.get('advanced');
      //         this.campService.sortProfiles(sorting);
      //         if (searchStr) {
      //             this.profiles = this.campService.profiles.filter(c => {
      //                 return c.name.indexOf(searchStr) !== -1 ? true : false;
      //             });
      //         }else{
      //             this.profiles = this.campService.profiles;
      //         }
      //         this.favorites = this.profiles.filter(c => c.favorited);

      //         switch (this.activeTab) {
      //           case 'all': {
      //             return this.profiles.filter(c => !c.favorited);
      //           }
      //           case 'favorited': {
      //               return this.favorites;
      //           }
      //           case 'mylist': {
      //             this.mselection.clear();
      //             this.mylistSource.data.forEach(row => this.mselection.select(row));
      //             return [];
      //           }
      //           default: {
      //             this.router.navigate(['panel/discover/list'],
      //                 { queryParams: { filter: 'all' } } )
      //             return [];
      //           }
      //         }
      //       })
      //     );
      //   })
      // }

      isAllSelected() {
        const numSelected = this.mselection.selected.length;
        const numRows = this.mylistSource.data.length;
        return numSelected === numRows;
      }
      masterToggle() {
        this.isAllSelected() ?
            this.mselection.clear() :
            this.mylistSource.data.forEach(row => this.mselection.select(row));
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
      checkboxLabel(row?: Profile): string {
        if (!row) {
          return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.mselection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
      }
      ccheckboxLabel(row?: Campaign): string {
        if (!row) {
            return `${this.iscAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.cselection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
      }
      ngAfterViewChecked(){
        this.cdr.detectChanges();
      }
      backList(){
          this.router.navigate(['panel/discover/list'],
              { queryParams: { filter: 'all' } } );
      }
      sendOffer(){
          if (!this.cselection.selected.length){
              const dialogRef = this.dialog.open(AlertDialogComponent, {
                  data: {
                      msg: 'Please select the campaign to send the offer.'
                  }
              });
          }else{
              let chatId = -1;
              const newId = this.campService.offers.length;
              this.mselection.selected.forEach(m => {
                  this.cselection.selected.forEach(c => {
                      // newId ++;
                      // this.campService.offers.push({
                      //     id: newId,
                      //     chatId: m.id,
                      //     campId: c.id,
                      //     status: 'pending',
                      // });

                      const formData: any = new FormData();
                      formData.append('campaign', c.id);
                      formData.append('budget', Math.round(c.budget));
                      formData.append('received_by', m.id);

                      this.dataService.sendOffer(formData)
                      .pipe()
                      .subscribe((cdata: any) => {

                        const chat: Chat = {
                          id: 3,
                          imageSrc: 'assets/img/avatars/profile-photo-03.png', // todo
                          from: 'Samantha Smith',
                          status: 'last seen: 5 hours ago',
                          message: 'Sure! I\'ll remind you tomorrow, hope we can get this ready!',
                          unreadCount: 0,
                          timestamp: DateTime.local().minus({ hours: 0 }).toRelative()
                        };

                        chat.imageSrc = this.campService.profiles.find(p => p.id == m.id).photo_img;
                        chat.from = this.campService.profiles.find(p => p.id == m.id).name;
                        chat.id = cdata.received_by;
                        // chat.from = cdata.sent_by;

                        chats.push(chat);

                        // chatId = m.id;
                        // if (chatId !== -1) {
                        //   this.router.navigate(['panel/chat/' + chatId]);
                        // }
                      });
                  });
                  chatId = m.id;
              });



              if (chatId !== -1) {
                  this.router.navigate(['panel/chat/' + chatId]);
              }
          }
      }
      openProfile(id?: Profile['id']){
          this.router.navigate(['panel/discover/view/' + id]);
      }
      openCheckout(id?: Profile['id']) {
        this.router.navigate(['panel/discover/checkout/' + id]);
      }
      deleteFromList(id?: Profile['id']){
        const my_list_id = this.campService.influencerMyListId;
        this.campService.removeInfluencerFromMyList(my_list_id, id );

        this.mselection.deselect(this.campService.myList.find(c => c.id === id));
        this.campService.deleteFromList(id);
        this.mylistSource.data = this.campService.myList;
      }
      goChat(id?: Profile['id']){
        const user_id = this.profiles.find(c => c.id === id).userid;
        this.dataService.creatANewConversation(user_id, 'Hi').subscribe((rep: any) => {
          this.router.navigate(['panel/chat/' + rep.conversation_uuid]);
        });
      }
      saveFavorite(id?: Profile['id']){


        const favorite_id = this.campService.influencerFavoriteListId;




        if (this.favorites.length > 0){
          const index = this.favorites.findIndex(c => c.id === id);
          if (index !== -1) {
            this.campService.removeInfluencerFromInfluencerFavoriteList(favorite_id, id);

            const fp = this.favorites.find(c => c.id === id);
            fp.favorited = false;
            this.favorites.splice(index, 1);
          }else{
            this.campService.saveInfluencerToFavoriteList(favorite_id, id );
            const profile = this.favorites.find(c => c.id === id);
            if (profile){
              profile.favorited = true;
              this.favorites.push(profile);
            }
            this.profiles = [...this.profiles.filter(item => {
                return item.id !== id;
            })];
          }
        }else{
          this.campService.saveInfluencerToFavoriteList(favorite_id, id );
          const profile = this.profiles.find(c => c.id === id);
          profile.favorited = true;
          this.favorites.push(profile);
          this.profiles = [...this.profiles.filter(item => {
                return item.id !== id;
            })];
        }
      }

      saveMylist(id?: Profile['id']){
        const my_list_id = this.campService.influencerMyListId;
        this.campService.saveInfluencerToMyList(my_list_id, id);

        const res = this.campService.addtoMyList(id);

        const dialogRef = this.dialog.open(SaveListDialogComponent, {
          data: {
            result: res
          }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.profiles = [...this.profiles.filter(item => {
                return item.id !== id;
            })];
        });
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
          // const r = this.router.navigate(['discover/list'],
          //     { queryParams: { filter: 'all' , sort: this.curfilter.value, advanced: true } } );
      }
      resetFilter() {
          this.applyFilter = false;
          this.advfilterForm.reset();
          this.filteropt.distance = [1000, 10000];
          this.filteropt.age = [0, 99];
          this.filteropt.price = [0, 100];
          this.filteropt.follower = [1000, 10000];
          this.filteropt.category.length = 0;
          this.filteropt.platform.length = 0;
          this.campService.filterOpt = this.filteropt;
      }
      translateFollowerLabel(value: number, step: number = 1000): string {
        const num = step >= 1000 ? value / step : value;
        if (num.toString().split('.').length > 1) {
          return num.toFixed(1) +  (step >= 1000 ? 'K' : '');
        }else{
          return num + (step >= 1000 ? 'K' : '');
        }
      }

      setFilter(filter: ShowFilter) {
        this.curfilter = filter;
        const r = this.router.navigate(['panel/discover/list'],
            { queryParams: { filter: this.activeTab , sort: filter.value } } );
      }
}
