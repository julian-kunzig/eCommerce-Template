import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignService} from '../../../providers/campaign.service';
import {Campaign} from '../interfaces/campaign.interface';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../../@vex/animations/scale-fade-in.animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import icCancel from '@iconify/icons-ic/outline-clear';
import {DatePipe} from '@angular/common';
import {ctData, qaData} from '../../../../static-data/questions';
import {Options} from 'ng5-slider';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {UserService} from '../../../providers/user.service';

import { DataService } from '../../../providers/data.service'

@Component({
  selector: 'vex-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class CampaignEditComponent implements OnInit {
  campaign: Campaign;
  editFormGroup: FormGroup;
  ePeriod = false;
  lttags: string[] = [];
  tags: string[] = [];
  tags2: string[] = [];
  removable = true;
  addOnBlur = true;
  selectable = true;
  icCancel = icCancel;
  date = new Date();
  influencers = qaData;
  contentdata = ctData;

  requirement_creation: string = '';
  requirement_product: string = '';

  ahighValue = 99;
  fhighValue = 10000;
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

  imageChangedEvent: any = '';
  croppedImage: any = '';

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              public campService: CampaignService,
              public dataService: DataService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.campaign = this.campService.getCampaignList().find(c => c.id ==id);
    this.tags = this.campaign.tags;
    this.lttags = this.campaign.locationtags;
    this.tags2 = this.campaign.tags2;

    if (this.campaign.periodStart || this.campaign.periodEnd){
      this.ePeriod = true;
    }
    this.editFormGroup = this.fb.group({
      requirement: [this.campaign.requirement, Validators.required],
      ctrlperiodStart: [null],
      ctrlperiodEnd: [null],
      locationtags: [null],
      ctrltags: [null],
      ctrltags2: [null],
      infquests: [null],
    });    
  }

  get categories() {
    return this.campService.categories;
  }
  get platforms() {
    return this.campService.platforms;
  }
  get placements() {
    return this.campService.placements;
  }
  get languages(){
    return this.campService.languages;
  }
  get countries() {
    return this.campService.countries;
  }
  get cities() {
    return this.campService.cities;
  }

  get periodStart() {
    return new Date(Date.parse(this.campaign.periodStart));
  }
  set periodStart(val) {
    if (val != undefined) {
      const dp: DatePipe = new DatePipe('en-US');
      this.campaign.periodStart = dp.transform(new Date(val), 'MM.dd.yyyy');
    }
  }
  get periodEnd() {
    return new Date(Date.parse(this.campaign.periodEnd));
  }
  set periodEnd(val) {
    if (val != undefined) {
      const dp: DatePipe = new DatePipe('en-US');
      this.campaign.periodEnd = dp.transform(new Date(val), 'MM.dd.yyyy');
    }
  }
  translateFollowerLabel(value: number): string {
    const num = value / 1000;
    if (num.toString().split('.').length > 1) {
      return num.toFixed(1) +  'K';
    }else{
      return num + 'K';
    }
  }
  onFileChange(event) {
    const reader = new FileReader();
    const cf = document.querySelectorAll('.img-cropping-wrapper')[0];

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.campaign.coverImg = reader.result as string;
      };

      this.imageChangedEvent = event;
      cf.classList.add('opened');
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  saveCroppedImage() {
    this.campaign.coverImg = this.croppedImage;
    const cf = document.querySelectorAll('.img-cropping-wrapper')[0];
    cf.classList.remove('opened');
  }
  skipCrop() {
    const cf = document.querySelectorAll('.img-cropping-wrapper')[0];
    cf.classList.remove('opened');
  }
  deleteGalleryItem(id) {
    this.campaign.gallery[id] = '';
  }
  uploadGalleryItem(id, event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.campaign.gallery[id] = reader.result as string;
      };
    }
  }
  enablePeriod(change: MatSlideToggleChange) {
    this.ePeriod = change.checked;
  }
  backList(){
    if (this.userService.currentUser.type === 'influencer') {
      this.router.navigate(['/panel/inf_discover/list'],
          { queryParams: { filter: 'all' } } );
    }else {
      const r = this.router.navigate(['/panel/campaign/list'],
          { queryParams: { filter: 'storage' } } );
    }
  }
  saveCampaign(){
    this.campaign.requirement = this.editFormGroup.value.requirement;
    const r = this.router.navigate(['/panel/campaign/list'],
        { queryParams: { filter: 'storage' } } );


    // var formData: any = new FormData();
    // formData.append('campaign_title', camp.name);
    // formData.append('campaign_description', camp.description);
    // formData.append('requirements', camp.requirement);
    // formData.append('location_tags', camp.locationtags);
    // formData.append('tags', camp.tags);
    // formData.append('criteria', camp.caption); //todo
    // formData.append('budget', Math.round(camp.budget));
    // formData.append('start_date', this.formatDate(camp.periodStart));
    // formData.append('end_date', this.formatDate(camp.periodEnd));
    // formData.append('images', camp.gallery);
    // this.dataService.upddateCampaign(this.campaign.id, this.campaign)
    // .pipe()
    // .subscribe(cdata => {
    //   console.log('update campaign', cdata);
    // });
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

  addQuest_creation(quest) {
    
  }
  addQuest_product(quest) {
    
  }
}
