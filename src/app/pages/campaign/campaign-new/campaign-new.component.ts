import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../../@vex/animations/scale-fade-in.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { qaData, ctData } from '../../../../static-data/questions';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Options } from 'ng5-slider';
import icCancel from '@iconify/icons-ic/outline-clear';
import { CampaignService } from '../../../providers/campaign.service';
import { MatStepper } from '@angular/material/stepper';
import { DatePipe } from '@angular/common';
import {BankAcc, CCard} from '../interfaces/payment.interface';
import {MatAccordion} from '@angular/material/expansion';
import {checkMatch} from '../../../helpers/match.validator';
import {Campaign} from '../interfaces/campaign.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'vex-campaign-new',
  templateUrl: './campaign-new.component.html',
  styleUrls: ['./campaign-new.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class CampaignNewComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  prodserviceGroup: FormGroup;
  briefingGroup: FormGroup;
  influencersGroup: FormGroup;
  submitGroup: FormGroup;
  ccFormGroup: FormGroup;
  bankFormGroup: FormGroup;
  icCancel = icCancel;
  ePeriod = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  lttags: string[] = [];
  tags: string[] = [];
  tags2: string[] = [];


  // requirement_total:string;
  requirement_creation: string;
  requirement_product: string;

  influencers = qaData;
  contentdata = ctData;
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

  campaign: Campaign;
  ccards: CCard[] = [];
  curCardId = 0;
  bankAcc: BankAcc;
  paymentOpt: string;
  currentStep: string;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private router: Router,
              public campService: CampaignService) {
    this.bankAcc = {
      type: '',
      routing: '',
      number: '',
      holder: '',
    };
    this.currentStep = 'steps-0';
    this.campaign = {
      name: '',
      category: [],
      budget: 0,
      coverImg: '',
      platform: [],
      placement: [],
      requirement: '',
      locationtags: [],
      tags: [],
      tags2: [],
      ages: [],
      gallery: [],
      followers: [],
      gender: '',
      city: '',
      country: '',
      langs: [],
      billingName: '',
      billingAddress1: '',
      billingAddress2: '',
      billingState: '',
      billingCity: '',
      billingZipcode: '',
      favorite: false,
    };
    this.requirement_creation = '';
    this.requirement_product = '';
  }
  get countries() {
    return this.campService.countries;
  }
  get cities() {
    return this.campService.cities;
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
  translateFollowerLabel(value: number): string {
    const num = value / 1000;
    if (num.toString().split('.').length > 1) {
      return num.toFixed(1) +  'K';
    }else{
      return num + 'K';
    }
  }
  ngOnInit(): void {
    this.prodserviceGroup = this.fb.group({
      servicename: [null, Validators.required],
      budget: [null],
      category: [null, Validators.required ],
      description: [null, Validators.required],
      coverImg: [null, Validators.required],
    });
    this.briefingGroup = this.fb.group({
      platform: [null, Validators.required],
      placement: [null, Validators.required],
      requirement: [null, Validators.required],
      periodStart: [null],
      periodEnd: [null],
      caption: [null],
      locationtags: [null],
      ctrltags: [null],
      ctrltags2: [null],
      galleryImg_1: [null],
      galleryImg_2: [null],
      galleryImg_3: [null],
      galleryImg_4: [null],
      galleryImg_5: [null],
      infquests: [null, Validators.required],
      contents: [null, Validators.required],
    });
    this.influencersGroup = this.fb.group({
      gender: [null],
      country: [null],
      city: [null],
      langs: [null],
      ages: [null],
      followers: [null],
    });
    this.submitGroup = this.fb.group({
      fullname: [null],
      addressline1: [null],
      addressline2: [null],
      addrcity: [null],
      addrstate: [null],
      zipcode: [null],
    });
    this.ccFormGroup = this.fb.group({
      ccardNum: [null],
      ccardName: [null],
      ccardExpmonth: [null],
      ccardExpyear: [null],
      ccardCVC: [null],
    });
    this.bankFormGroup = this.fb.group({
      bankType: ['Checking', Validators.required],
      bankRouting: [null],
      bankAccnum: [null, Validators.required],
      bankAccholder: [null],
      bankCfAccnum: [null, Validators.required],
    }, { validator: checkMatch('bankAccnum', 'bankCfAccnum') });

    this.influencers.forEach(it => {
      it.completed = false;
      if(it.sub_quetions){
        it.sub_quetions.forEach(sit => {
          sit.completed = false;
        })
      }
    });
    this.contentdata.forEach(it => {
      it.completed = false;
    });
  }
  get f() { return this.bankFormGroup.controls; }

  prevStep(stepper: MatStepper){
    stepper.previous();
  }
  nextStep(stepper: MatStepper){
    if (stepper.selectedIndex === 0)
    {
      const bf = document.querySelectorAll('.budget-field')[0];
      if (this.prodserviceGroup.value.budget == null && !bf.classList.contains('mat-field-invalid')) {
        bf.classList.add('mat-field-invalid');
      }else{
        bf.classList.remove('mat-field-invalid');
      }
      const cf = document.querySelectorAll('.upload-img-field .upload-btn-wrapper')[0];
      if (this.prodserviceGroup.value.coverImg == null && !cf.classList.contains('mat-field-invalid')) {
        cf.classList.add('mat-field-invalid');
      }else{
        cf.classList.remove('mat-field-invalid');
      }
    }
    stepper.next();
    switch (stepper.selectedIndex) {
      case 1:
        this.proceedServiceForm();
        break;
      case 2:
        this.proceedBriefForm();
        break;
      case 3:
        this.proceedInfluenForm();
        break;
      case 5:
        this.proceedBillingForm();
        break;
    }
  }
  proceedServiceForm() {
    this.campaign.name = this.prodserviceGroup.value.servicename;
    this.campaign.coverImg = this.prodserviceGroup.value.coverImg;
    this.campaign.category = this.prodserviceGroup.value.category;
    this.campaign.description = this.prodserviceGroup.value.description;
    this.campaign.budget = this.prodserviceGroup.value.budget;
  }

  proceedBriefForm() {
    this.campaign.platform = this.briefingGroup.value.platform;
    this.campaign.placement = this.briefingGroup.value.placement;

    let req: string = '';
    this.influencers.forEach(it => {
      if(it.completed == true)
      {
        req = it.question;
        if(it.sub_quetions)
        {
          it.sub_quetions.forEach(sit => {
            if(sit.completed){
              req = req + '\n' + '\u00A0\u00A0\u00A0\u00A0' + '○ ' + sit.question;
            }
          })
        }        
      }
    })

    let requirement_display = '○ ' + this.briefingGroup.value.requirement + '\n' + this.requirement_creation + '\n' + '○ ' + req;
    this.campaign.requirement = requirement_display;
    if (this.ePeriod && this.briefingGroup.value.periodStart && this.briefingGroup.value.periodEnd ) {
      const datepipe: DatePipe = new DatePipe('en-US');
      this.campaign.periodStart = datepipe.transform(new Date(this.briefingGroup.value.periodStart), 'MM.dd.yyyy');
      this.campaign.periodEnd = datepipe.transform(new Date(this.briefingGroup.value.periodEnd), 'MM.dd.yyyy');
    }
    this.campaign.caption = this.briefingGroup.value.caption;
    this.campaign.tags = this.tags;
    this.campaign.tags2 = this.tags2;
    this.campaign.locationtags = this.lttags;
    this.campaign.quests = this.briefingGroup.value.infquests;
    this.campaign.contents = this.briefingGroup.value.contents;
    this.campaign.gallery = [
      this.briefingGroup.value.galleryImg_1 ? this.briefingGroup.value.galleryImg_1 : '',
      this.briefingGroup.value.galleryImg_2 ? this.briefingGroup.value.galleryImg_2 : '',
      this.briefingGroup.value.galleryImg_3 ? this.briefingGroup.value.galleryImg_3 : '',
      this.briefingGroup.value.galleryImg_4 ? this.briefingGroup.value.galleryImg_4 : '',
      this.briefingGroup.value.galleryImg_5 ? this.briefingGroup.value.galleryImg_5 : ''
    ];
  }
  proceedInfluenForm() {
    this.campaign.gender = this.influencersGroup.value.gender;
    this.campaign.ages = this.influencersGroup.value.ages;
    this.campaign.followers = this.influencersGroup.value.followers;
    this.campaign.country = this.influencersGroup.value.country;
    this.campaign.city = this.influencersGroup.value.city;
    this.campaign.langs = this.influencersGroup.value.langs;
  }
  proceedBillingForm() {
    this.campaign.billingName = this.submitGroup.value.fullname;
    this.campaign.billingAddress1 = this.submitGroup.value.addressline1;
    this.campaign.billingAddress2 = this.submitGroup.value.addressline2;
    this.campaign.billingState = this.submitGroup.value.addrstate;
    this.campaign.billingCity = this.submitGroup.value.addrcity;
    this.campaign.billingZipcode = this.submitGroup.value.zipcode;
    this.campaign.ccards = this.ccards;
    this.campaign.bankAccount = this.bankAcc;
  }
  submitCampaign() {
    this.campService.addNewCampaign(this.campaign);
    this.router.navigate(['panel/campaign/list'],
        { queryParams: { filter: 'storage' } } );
  }
  enablePeriod(change: MatSlideToggleChange) {
    this.ePeriod = change.checked;
  }
  openForm(selector, exist = 0){
    if (selector === 'creditcard') {
      this.curCardId = exist;
      this.ccFormGroup.reset();
      if (exist !== 0) {
        const id = this.ccards.findIndex((elem) => elem.id === exist);
        this.ccFormGroup.get('ccardNum').setValue(this.ccards[id].number);
        this.ccFormGroup.get('ccardName').setValue(this.ccards[id].name);
        this.ccFormGroup.get('ccardExpmonth').setValue(this.ccards[id].expMonth);
        this.ccFormGroup.get('ccardExpyear').setValue(this.ccards[id].expYear);
        this.ccFormGroup.get('ccardCVC').setValue(this.ccards[id].cvc);
      }
    }
    const wrapper = document.querySelectorAll('.payments .' + selector)[0];
    wrapper.classList.toggle('opened');
  }
  updateMethod(){
    const id = this.ccards.findIndex((elem) => elem.id === this.curCardId);
    this.ccards[id].number = this.ccFormGroup.value.ccardNum;
    this.ccards[id].name = this.ccFormGroup.value.ccardName;
    this.ccards[id].expMonth = this.ccFormGroup.value.ccardExpmonth;
    this.ccards[id].expYear = this.ccFormGroup.value.ccardExpyear;
    this.ccards[id].cvc = this.ccFormGroup.value.ccardCVC;

    const wrapper = document.querySelectorAll('.payments .creditcard')[0];
    wrapper.classList.toggle('opened');
  }
  deleteInfo(selector, exist = 0) {
    if (selector === 'creditcard') {
      const id = this.ccards.findIndex((elem) => elem.id === exist);
      this.ccards.splice(id, 1);
    }else{
      this.bankAcc = {
        type: '',
        routing: '',
        number: '',
        holder: '',
      };
    }
  }
  closeForm(selector) {
    const wrapper = document.querySelectorAll('.payments .' + selector)[0];
    wrapper.classList.remove('opened');
  }
  addMethod(type) {
    if (type === 'creditcard') {
      let cid = 1;
      if ( this.ccards ) {
        cid = this.ccards.length + 1;
      }
      this.ccards.push({
        id: cid,
        number: this.ccFormGroup.value.ccardNum,
        name: this.ccFormGroup.value.ccardName,
        expMonth: this.ccFormGroup.value.ccardExpmonth,
        expYear: this.ccFormGroup.value.ccardExpyear,
        cvc: this.ccFormGroup.value.ccardCVC,
      });

      this.paymentOpt = type;
      const wrapper = document.querySelectorAll('.payments .' + type)[0];
      wrapper.classList.remove('opened');
    }
  }
  saveBankInfo(){
    this.paymentOpt = 'bank';
    if (this.bankFormGroup.valid) {
      this.bankAcc.type = this.bankFormGroup.value.bankType;
      this.bankAcc.routing = this.bankFormGroup.value.bankRouting;
      this.bankAcc.number = this.bankFormGroup.value.bankAccnum;
      this.bankAcc.holder = this.bankFormGroup.value.bankAccholder;
      const wrapper = document.querySelectorAll('.payments .bank')[0];
      wrapper.classList.remove('opened');
    }
  }
  cancelForm() {
    const wrapper = document.querySelectorAll('.payments .opened')[0];
    wrapper.classList.remove('opened');
  }
  selectionChange(event) {
    this.currentStep = 'steps-' + event.selectedIndex;
    const slabels = Array.from(document.querySelectorAll('.mat-step-header .mat-step-label'));
    slabels.forEach(elem => {
      elem.classList.remove('mat-step-label-active');
    });
    for (let i = event.selectedIndex; i >= 0; i--) {
      slabels[i].classList.add('mat-step-label-active');
    }
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
    this.requirement_creation = '○ ' + quest;
    // let txt = '- ' + quest;
    // this.requirement_total = this.requirement_total + '\n' + txt;
    // this.contentdata.find(quest)
    // // if (this.briefingGroup.value.requirement) {
    // //   txt = this.briefingGroup.value.requirement + '\n' + txt;
      
    // // }
    // console.log(this.requirement_total);
    //this.briefingGroup.patchValue({ requirement: txt});
    //console.log(this.briefingGroup.value.requirement);
  }
  addQuest_product(quest) {
    this.requirement_product = '○ ' + quest;
    
  }
}
