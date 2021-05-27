import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../../@vex/animations/scale-fade-in.animation';
import {
  Analyze,
  Profile,
  Review,
} from '../../campaign/interfaces/profile.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from '../../../providers/campaign.service';
import { ShowFilter } from '../../campaign/campaign-grid/campaign-grid.component';
import icTrendingUp from '@iconify/icons-ic/twotone-trending-up';
import icTrendingDown from '@iconify/icons-ic/twotone-trending-down';
import icArrowDown from '@iconify/icons-ic/twotone-keyboard-arrow-down';
import { DatePipe } from '@angular/common';
import { SaveListDialogComponent } from '../discover-grid/discover-grid.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ReviewDialogComponent } from '../../user/user-view/user-view.component';

@Component({
  selector: 'vex-checkout-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms,
  ],
})
export class CheckoutViewComponent implements OnInit {
  icTrendingUp = icTrendingUp;
  icTrendingDown = icTrendingDown;
  icArrowDown = icArrowDown;
  profile: Profile;
  curfilter: ShowFilter;
  filters: ShowFilter[] = [];
  campaigns: any[] = [];
  agreed: Boolean = false;
  review: Boolean = false;
  panelOpenState: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    public campService: CampaignService
  ) {}
  translateFollowerLabel(value: number): string {
    const num = value / 1000;
    if (num.toString().split('.').length > 1) {
      return num.toFixed(1) + 'K';
    } else {
      return num + 'K';
    }
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.profile = this.campService.profiles.find((p) => p.id == id);

    const socials = ['instagram', 'facebook', 'youtube'];
    socials.forEach((s) => {
      this.filters.push({
        value: s,
        label: this.campService.getSocialLabel(s),
      });
    });
    if (this.filters) {
      this.curfilter = this.filters[0];
    }

    this.campaigns = [
      {
        label: 'test1',
        value: 'test1',
      },
      {
        label: 'test2',
        value: 'test2',
      },
    ];
  }
  setFilter(filter: ShowFilter) {
    this.curfilter = filter;
  }
  getReviews() {
    return this.campService.reviews.filter(
      (c) => c.profile_id === this.profile.id
    );
  }
  openReviewDetail(id?: Review['review_id']) {
    const index = this.campService.reviews.findIndex(
      (elem) => elem.review_id === id
    );

    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: {
        review: this.campService.reviews[index],
      },
      panelClass: 'review-modal',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  calcRating() {
    const reviews = this.getReviews();
    if (reviews) {
      let sum = 0;
      reviews.forEach((c) => {
        sum = sum + c.rating;
      });

      const avg = (sum / reviews.length).toFixed(1);
      return avg;
    }
  }
  saveMylist() {
    const res = this.campService.addtoMyList(this.profile.id);
    const dialogRef = this.dialog.open(SaveListDialogComponent, {
      data: {
        result: res,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  calcRatingWidth() {
    const width = Number(this.calcRating()) * 20;
    return width;
  }
  calcRatingWidthByScore(scoreL, scoreH) {
    const reviews = this.getReviews();
    if (reviews) {
      const byscore = reviews.filter(
        (c) => c.rating >= scoreL && c.rating <= scoreH
      );
      if (byscore) {
        return ((byscore.length / reviews.length) * 100).toFixed(1);
      }
    }

    return 0;
  }
  saveFavorite() {
    this.profile.favorited = !this.profile.favorited;
  }
  get SummaryData(): Analyze {
    const data: Analyze[] = this.campService.analysisData.filter((c) => {
      return (
        c.profile_id === this.profile.id && c.platform === this.curfilter.value
      );
    });
    return data ? data[0] : null;
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
  goChat() {
    this.router.navigate(['panel/chat/' + this.profile.id]);
  }
  translateDate(date) {
    const dp: DatePipe = new DatePipe('en-US');
    return dp.transform(new Date(date), 'dd, MMM, yyyy');
  }

  edit() {}

  changeAgreed(e) {}

  cancelCheckout() {
    this.router.navigate(['panel/discover/list'], {
      queryParams: { filter: 'all' },
    });
  }

  hire() {
    this.review = true;
  }

  addCard() {}

  openCard() {
    const dialogRef = this.dialog.open(CheckoutCardDialog, {
      width: '250px',
      data: { name: 'test', cardNum: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  removeCard() {}

  editCard() {}

  deposit() {}

  cancelDeposit() {
    this.review = false;
  }
}

export interface DialogData {
  name: string;
  cardNum: string;
}

@Component({
  selector: 'checkout-card-dialog',
  templateUrl: 'checkout-card-dialog.html',
})
export class CheckoutCardDialog {
  constructor(
    public dialogRef: MatDialogRef<CheckoutCardDialog>,

    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCard(): void {}
}
