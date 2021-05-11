import { Component, OnInit } from '@angular/core';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User, UserService} from '../../../providers/user.service';
import {DatePipe} from '@angular/common';
import {BankAcc, CCard} from '../../campaign/interfaces/payment.interface';
import {checkMatch} from '../../../helpers/match.validator';
import icCancel from '@iconify/icons-ic/outline-clear';
import {profCatsData} from '../../../../static-data/categories';

import { DataService } from '../../../providers/data.service'

@Component({
  selector: 'vex-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class UserProfileComponent implements OnInit {
  profileFormGroup: FormGroup;
  ccFormGroup: FormGroup;
  bankFormGroup: FormGroup;
  categories = profCatsData;
  profile: User;
  disableEmail = true;
  disablePhone = true;
  ccards: CCard[] = [];
  curCardId = 0;
  bankAcc: BankAcc;
  paymentOpt: string;
  icCancel = icCancel;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              public userService: UserService,
              private router: Router,
              public dataService: DataService) {
    this.profile = this.userService.currentUser;
  }

  ngOnInit(): void {
    this.profileFormGroup = this.fb.group({
      ctrlbirth: [null],
      ctrlemail: [this.profile.email],
      ctrlphone: [this.profile.phone],
      fullName: [this.profile.fullName],
      gender: [this.profile.gender],
      addressline1: [this.profile.address1],
      addressline2: [this.profile.address2],
      addrcity: [this.profile.city],
      addrstate: [this.profile.state],
      zipcode: [this.profile.zipCode],
      cats: [this.profile.category],
      bio: [this.profile.bio],
      brandsite: [this.profile.brandsite],
      company: [this.profile.company],
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
    this.bankAcc = {
      type: '',
      routing: '',
      number: '',
      holder: '',
    };
  }
  toggleDisable(field) {
    if (field === 'email') {
      this.disableEmail = !this.disableEmail;
    }
    if (field === 'phone') {
      this.disablePhone = !this.disablePhone;
    }
  }
  saveProfile(){
    this.profile.fullName = this.profileFormGroup.value.fullName;
    this.profile.email = this.profileFormGroup.value.ctrlemail;
    this.profile.phone = this.profileFormGroup.value.ctrlphone;
    this.profile.gender = this.profileFormGroup.value.gender;

    this.profile.address1 = this.profileFormGroup.value.addressline1;
    this.profile.address2 = this.profileFormGroup.value.addressline2;
    this.profile.state = this.profileFormGroup.value.addrstate;
    this.profile.city = this.profileFormGroup.value.addrcity;
    this.profile.zipCode = this.profileFormGroup.value.zipcode;
    this.profile.cCards = this.ccards;
    this.profile.bankAccount = this.bankAcc;

    this.profile.brandsite = this.profileFormGroup.value.brandsite;
    this.profile.company = this.profileFormGroup.value.company;
    this.profile.category = this.profileFormGroup.value.cats;

    this.profile.bio = this.profileFormGroup.value.bio;

    var formData: any = new FormData();

    if(this.profile.type == 'advertiser') {
      formData.append('company_name', this.profile.company);
      formData.append('about_company', this.profile.bio);
      formData.append('website', this.profile.brandsite);
      console.log('advertiser profile edit', formData, this.profile.profileId);
      this.dataService.updateAdvertiser(this.profile.profileId, formData)
      .pipe()
      .subscribe(cdata => {
        console.log('update influencer', cdata);
        this.router.navigate(['panel/user/setting']);
      });
    }
    else {
      var gender = this.profile.gender == 'female' ? 'F' : 'M';
      var name = this.profile.fullName.split(' ');
      
      formData.append('biography', this.profile.bio);
      formData.append('birthday', this.formatDate(this.profile.birthDay));
      formData.append('gender', gender);
      // formData.append('categories', this.profile.category);
      formData.append('first_name', name[0]);
      formData.append('last_name', name[1]);
      
      this.dataService.updateInfluencer(this.profile.profileId, formData)
      .pipe()
      .subscribe(cdata => {
        console.log('update influencer', cdata);
        this.router.navigate(['panel/user/setting']);
      });
    }
    

    // this.router.navigate(['panel/user/setting']);
  }
  formatDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    // if (month.length < 2) 
    //     month = '0' + month;
    // if (day.length < 2) 
    //     day = '0' + day;

    return [year, month, day].join('-');
  }
  get BirthDay() {
    return new Date(Date.parse(this.profile.birthDay));
  }
  set BirthDay(val) {
    const dp: DatePipe = new DatePipe('en-US');
    this.profile.birthDay = dp.transform(new Date(val), 'MM.dd.yyyy');
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
}
