import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {Analyze, Profile, Review} from '../../campaign/interfaces/profile.interface';
import {ShowFilter} from '../../campaign/campaign-grid/campaign-grid.component';
import icTrendingUp from '@iconify/icons-ic/twotone-trending-up';
import icTrendingDown from '@iconify/icons-ic/twotone-trending-down';
import icArrowDown from '@iconify/icons-ic/twotone-keyboard-arrow-down';
import icCancel from '@iconify/icons-ic/outline-clear';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CampaignService} from '../../../providers/campaign.service';
import {UserService} from '../../../providers/user.service';
import {SaveListDialogComponent} from '../../discover/discover-grid/discover-grid.component';
import {DatePipe} from '@angular/common';
import {Campaign} from '../../campaign/interfaces/campaign.interface';
import {profCatsData} from '../../../../static-data/categories';
import { DataService } from 'src/app/providers/data.service';

@Component({
  selector: 'vex-review-dialog',
  templateUrl: 'review-dialog.component.html',
})
export class ReviewDialogComponent {
  icCancel = icCancel;
  constructor(private dialogRef: MatDialogRef<UserViewComponent>, @Inject(MAT_DIALOG_DATA) public data: { review: Review }) {}
  close() {
    this.dialogRef.close();
  }
  translateDate(date) {
    const dp: DatePipe = new DatePipe('en-US');
    return dp.transform(new Date(date), 'dd, MMM, yyyy');
  }
}

@Component({
  selector: 'vex-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class UserViewComponent implements OnInit {
  icTrendingUp = icTrendingUp;
  icTrendingDown = icTrendingDown;
  icArrowDown = icArrowDown;
  profile: Profile;
  curfilter: ShowFilter;
  filters: ShowFilter[] = [];
  campaigns: Campaign[] = [];
  ratingDatas: [];

  socialIconShow: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef,
              public dialog: MatDialog,
              public dataService: DataService,
              public campService: CampaignService,
              public userService: UserService) { }
  translateFollowerLabel(value: number): string {
    const num = value / 1000;
    if (num.toString().split('.').length > 1) {
      return num.toFixed(1) +  'K';
    }else{
      return num + 'K';
    }
  }
  ngOnInit(): void {
    this.campaigns = this.campService.campList;
    if (this.userService.currentUser.type === 'advertiser') {
      this.profile = {
        id: 7,
        profile_bg: 'assets/img/demo/profile-bg-01.jpg',
        photo_img: 'assets/img/user-photo.png',
        name: 'Heybin Song',
        userid: 'heybin_song',
        socials: ['instagram', 'facebook', 'youtube'],
        gender: 'female',
        ages: [18, 25],
        sayings: 'I love taking pictures and enjoy experiencing a new journey in my life. I’ll be happy if I work with you!Check my new video in Youtube! Link',
        video: 'youtube.com/23sskaitlyn',
        categories: ['fashion', 'travel', 'books'],
        acheivedCampaign: 56,
        followers: 2500,
        followers_change: 0.3,
        posts: 30,
        hotness: 99,
        price: '50-60',
        favorited: false,
      };
    }else{
      // this.profile = this.campService.profiles.find(elem => elem.id === this.userService.currentUser.userId );
      this.profile = this.userService.currentUserProfile;
      this.userService.currentUserAnalyze.filter(c => {
        if(c.platform != null) {
          this.socialIconShow.push(c.platform);
        }
      });
    }

    this.profile.socials.forEach(s => {
      this.filters.push({
        value: s,
        label: this.campService.getSocialLabel(s),
      });
    });
    if (this.filters) {
      this.curfilter = this.filters[0];
    }

    this.getListOfRatingsForAnInfluencer();
  }
  openCampaign(id?: Campaign['id']) {
    const r = this.router.navigate(['panel/campaign/view/' + id]);
  }
  setFilter(filter: ShowFilter) {
    this.curfilter = filter;
    this.cd.detectChanges();
  }
  getReviews(){
    return this.campService.reviews.filter(c => c.profile_id === this.profile.id);
  }
  getCatLabel(value) {
    const cats = profCatsData;
    const id = cats.findIndex((elem) => elem.value === value);
    return id !== -1 ? cats[id].label : '';
  }
  calcRating() {
    const reviews = this.getReviews();
    if (reviews) {
      let sum = 0;
      reviews.forEach(c => {
        sum = sum + c.rating;
      });

      const avg = (sum / reviews.length).toFixed(1);
      return avg;
    }
  }
  saveMylist(){
    const res = this.campService.addtoMyList(this.profile.id);
    const dialogRef = this.dialog.open(SaveListDialogComponent, {
      data: {
        result: res
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  calcRatingWidth() {
    const width = Number(this.calcRating()) * 20;
    return width;
  }
  calcRatingWidthByScore(scoreL, scoreH) {
    const reviews = this.getReviews();
    if (reviews){
      const byscore = reviews.filter(c => c.rating >= scoreL && c.rating <= scoreH);
      if (byscore) {
        return (byscore.length / reviews.length * 100).toFixed(1);
      }
    }

    return 0;
  }
  openReviewDetail(id?: Review['review_id']) {
    const index = this.campService.reviews.findIndex((elem) => elem.review_id === id);
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: {
        review: this.campService.reviews[index]
      },
      panelClass: 'review-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDetail(item){
    let format:Review = {
      review_id: 1,
      profile_id : item.influencer,
      reviewer : '',
      review_title : item.rating_title,
      rating : Number(item.avg_rating || 0),
      review_date : '11/02/2020',
      summary : item.detailed_review,
      platform : '',
      rating_values : [Number(item.cooperation), Number(item.quality), Number(item.communication), Number(item.deadline)]
    }

    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: {
        review: format
      },
      panelClass: 'review-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  saveFavorite() {
    this.profile.favorited = !this.profile.favorited;
  }
  get SummaryData(): Analyze {
    // const data: Analyze[] = this.campService.analysisData.filter(c => {
    //   return c.profile_id === this.profile.id && c.platform === this.curfilter.value;
    // });
    const data: Analyze[] = this.userService.currentUserAnalyze.filter(c => {
      return c.platform === this.curfilter.value;});
    //console.log(data);
    return data? data[0] : null;
  }
  get Followers() {
    return this.SummaryData.followers;
  }
  get Likes() {
    return this.SummaryData.likes;
  }
  get Posting() {
    return this.SummaryData.posting;
  }
  get Comments() {
    return this.SummaryData.comments;
  }
  get Rating() {
    return this.SummaryData.rate;
  }
  get Post_Urls() {
    return this.SummaryData.post_urls;
  }
  goChat(){
    this.router.navigate(['panel/chat/' + this.profile.id]);
  }
  translateDate(date) {
    const dp: DatePipe = new DatePipe('en-US');
    return dp.transform(new Date(date), 'dd, MMM, yyyy');
  }

  getListOfRatingsForAnInfluencer(){
    this.dataService.getMyInfluencerProfile().subscribe((rep:any) =>{
      let profile_id = rep.results[0].profile_uuid;
      this.dataService.getListOfRatingsForAnInfluencer(profile_id).subscribe((cdata:any) => {
        let datas = cdata.results;
        this.ratingDatas = datas;
        console.log(this.ratingDatas)
      })
    })
  }
}
