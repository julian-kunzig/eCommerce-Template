import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignService, Offer} from '../../../providers/campaign.service';
import {MatStepper} from '@angular/material/stepper';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import icCancel from '@iconify/icons-ic/outline-clear';
import icLink from '@iconify/icons-ic/link';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {DatePipe} from '@angular/common';
import {UserService} from '../../../providers/user.service';
import {Campaign} from '../../campaign/interfaces/campaign.interface';
import {Profile} from '../../campaign/interfaces/profile.interface';
import {Location} from '@angular/common';

import { DataService } from '../../../providers/data.service'

@Component({
  selector: 'vex-offer-progress',
  templateUrl: './offer-progress.component.html',
  styleUrls: ['./offer-progress.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class OfferProgressComponent implements OnInit, AfterViewChecked {
    currentStep: string;
    offer: Offer;
    profile: Profile;
    campaign: Campaign;
    packageform: FormGroup;
    reviewform: FormGroup;
    shareform: FormGroup;
    paymentform: FormGroup;
    ratingform: FormGroup;
    packinfo = false;
    tags: string[] = [];
    tags2: string[] = [];
    lttags: string[] = [];
    removable = true;
    addOnBlur = true;
    selectable = true;
    changeReq = false;
    icCancel = icCancel;
    icLink = icLink;
    numbers = [1, 2, 3, 4, 5];
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private router: Router,
              public campService: CampaignService,
              public userService: UserService,
              public dataService: DataService,
              private location: Location) {
      this.currentStep = 'steps-0';
      this.packageform = this.fb.group({
          shipDate: ['', Validators.required],
          arrivalDate: [null],
          trackNo: ['', Validators.required],
      });
      this.reviewform = this.fb.group({
          post_img: ['', Validators.required],
          caption: [null],
          ctrltags: [null],
          ctrltags2: [null],
          locationtags: [null],
      });
      this.shareform = this.fb.group({
          postlink: ['', Validators.required],
      });
      this.paymentform = this.fb.group({
          pcard: ['', Validators.required],
      });
      this.ratingform  = this.fb.group({
          qt_rating: [null],
          dl_rating: [null],
          cm_rating: [null],
          co_rating: [null],
          r_summary: [null],
      });
  }
  get isAdvertiser(){
      return this.userService.currentUser.type === 'advertiser' ? true : false;
  }
    get spDate() {
      if (this.offer.ship_date) {
          return new Date(Date.parse(this.offer.ship_date));
      }
      return '';
    }
    set spDate(val) {
        if (val !== undefined && val !== '') {
            const dp: DatePipe = new DatePipe('en-US');
            this.offer.ship_date = dp.transform(new Date(val), 'MM.dd.yyyy');
        }
    }
    get arrvDate() {
        if (this.offer.arrv_date) {
            return new Date(Date.parse(this.offer.arrv_date));
        }
        return '';
    }
    set arrvDate(val) {
        if (val !== undefined && val !== '') {
            const dp: DatePipe = new DatePipe('en-US');
            this.offer.arrv_date = dp.transform(new Date(val), 'MM.dd.yyyy');
        }
    }
    expandReq() {
      this.changeReq = !this.changeReq;
    }
    approve(stepper: MatStepper) {
        const id = this.route.snapshot.paramMap.get('id');
        var formData: any = new FormData();
        formData.append('review_status', 'Accepted'); 
        formData.append('suggested_edits', this.offer.change_note); 
        if(this.offer.offer_progress != null) {
            this.dataService.reviewSubmission(this.offer.offer_progress.submission_review.submission_uuid, formData)
            .pipe()
            .subscribe((cdata : any) => {
                console.log('approve', cdata);
                stepper.next();
            });
        }
        
    }
    ngAfterViewChecked(): void {
        if (this.isAdvertiser) {
            this.packinfo = true;
        }else{
            this.packinfo = this.offer.ship_date !== '';
        }
        const slabels = Array.from(document.querySelectorAll('.mat-step-header .mat-step-label'));
        slabels.forEach(elem => {
            elem.classList.remove('mat-step-label-active');
        });
        if (document.querySelectorAll('.mat-step-header').length > 0) {
            if (this.packinfo) {
                document.querySelectorAll('.mat-step-header')[0].classList.add('mat-step-label-active');
            }else{
                if (! this.isAdvertiser) {
                    const hdrs = document.querySelectorAll('.mat-step-header');
                    hdrs.forEach(elem => {
                        elem.classList.add('pointer-none');
                    });
                }
            }
        }
        this.cd.detectChanges();
    }
    savePackingInfo(stepper: MatStepper){
        const id = this.route.snapshot.paramMap.get('id');

        const datepipe: DatePipe = new DatePipe('en-US');
        this.offer.ship_date = datepipe.transform(new Date(this.packageform.value.shipDate), 'MM.dd.yyyy');
        this.offer.arrv_date = datepipe.transform(new Date(this.packageform.value.arrivalDate), 'MM.dd.yyyy');

        console.log('save package1 ', this.packageform.value.shipDate, this.offer.track_no, this.offer.ship_carrier, this.packageform.value.arrivalDate, this.offer);
        
        var formData: any = new FormData();
        formData.append('ship_date', datepipe.transform(new Date(this.packageform.value.shipDate), 'yyyy-MM-dd')); 
        formData.append('tracking_number', this.offer.track_no); 
        formData.append('shipping_carrier', this.offer.ship_carrier); 
        formData.append('arrival_date', datepipe.transform(new Date(this.packageform.value.arrivalDate), 'yyyy-MM-dd')); 

        if(this.offer.offer_progress != null) {
            this.dataService.savePackageDetail(this.offer.offer_progress.package.package_uuid, formData)
            .pipe()
            .subscribe((cdata : any) => {
                console.log('save package', cdata);
                stepper.next();
            })
        }
        

        
    }
    saveShareLink(stepper: MatStepper) {
        const id = this.route.snapshot.paramMap.get('id');
        var formData: any = new FormData();
        formData.append('link', this.shareform.value.postlink); 
        if(this.offer.offer_progress != null) {
            this.dataService.provideUploadedContent(this.offer.offer_progress.uploaded_content.upload_uuid, formData)
            .pipe()
            .subscribe((cdata : any) => {
                console.log('upload content', cdata);
                stepper.next();
            })
        }
        
    }
    confirmShareLink(stepper: MatStepper) {
        stepper.next();
    }
    savePostInfo(stepper: MatStepper) {
        this.offer.post_img = this.reviewform.value.post_img;
        this.offer.tags = this.tags;
        this.offer.tags2 = this.tags2;
        this.offer.locationtags = this.lttags;
        this.offer.caption = this.reviewform.value.caption;

        const id = this.route.snapshot.paramMap.get('id');
        var formData: any = new FormData();
        formData.append('caption', this.offer.caption); 
        formData.append('hashtags', this.offer.tags2); 
        formData.append('mentions', this.offer.tags); 
        formData.append('location_tag', this.offer.locationtags); 
        if(this.offer.offer_progress != null) {
            this.dataService.postSubmission(this.offer.offer_progress.submission_review.submission_uuid, formData)
            .pipe()
            .subscribe((cdata : any) => {
                console.log('post review', cdata);
                stepper.next();
            })
        }
        
    }
    ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.offer = this.campService.offers.find(c => c.id == id);

    console.log(`PROGRESSSSSSSS: ${this.offer.type}`) // .offer_progress.type
    // this.campaign = this.campService.campList.find( c => c.id === this.offer.campId );
    // this.profile = this.campService.profiles.find(elem => elem.id === this.offer.profile_id);
    // console.log("profiles...........", this.campService.profiles, this.profile)
    // console.log("campaigns...........", this.campService.campList, this.campaign)
  }
    calcRatingWidth() {
        const width = Number(this.offer.adv_review.rating) * 20;
        return width;
    }
    calcRating(){
        this.offer.adv_review.rating = Number( this.offer.adv_review.rating_values[0] + this.offer.adv_review.rating_values[1]
        + this.offer.adv_review.rating_values[2] + this.offer.adv_review.rating_values[3] ) / 4;
    }
  selectionChange(event) {
    this.currentStep = 'steps-' + event.selectedIndex;
    const slabels = Array.from(document.querySelectorAll('.mat-step-header'));
    slabels.forEach(elem => {
      elem.classList.remove('mat-step-label-active');
    });
    for (let i = event.selectedIndex; i >= 0; i--) {
      slabels[i].classList.add('mat-step-label-active');
    }
  }
  prevStep(stepper: MatStepper){
    stepper.previous();
  }
  nextStep(stepper: MatStepper){
    stepper.next();
  }
    add(event: MatChipInputEvent, type = 1): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            if ( type === 2) {
                this.tags2.push(value.trim());
            }else if (type === 1){
                this.tags.push(value.trim());
            }else{
                this.lttags.push(value.trim());
            }
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }
    remove(obj, type = 1): void {
        if (type === 2) {
            const index = this.tags2.indexOf(obj);
            if (index >= 0) {
                this.tags2.splice(index, 1);
            }
        }else if (type === 1){
            const index = this.tags.indexOf(obj);
            if (index >= 0) {
                this.tags.splice(index, 1);
            }
        }else{
            const index = this.lttags.indexOf(obj);
            if (index >= 0) {
                this.lttags.splice(index, 1);
            }
        }
    }
    translateDate(date) {
        const dp: DatePipe = new DatePipe('en-US');
        return dp.transform(new Date(date), 'dd, MMM, yyyy');
    }
    backList(){
        this.location.back();
    }
    negotiate() {
        const r = this.router.navigate(['panel/offer/edit/' + this.offer.id]);
    }

    acceptOffer() {
        console.log('accept offer');
        const id = this.route.snapshot.paramMap.get('id');
        var formData: any = new FormData();
        formData.append('accepted', true);
        formData.append('received_by_me', true);

        this.dataService.checkOffer(id, formData)
        .pipe()
        .subscribe(cdata => {
            console.log('accept offer', cdata);
        });
    }
}
