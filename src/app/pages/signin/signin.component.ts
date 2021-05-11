import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import {fadeInUp400ms} from '../../../@vex/animations/fade-in-up.animation';
import {UserService} from '../../providers/user.service';
import { filter, first } from 'rxjs/operators';

import { AuthenticationService } from '../../providers/authentication.service'
import { DataService } from '../../providers/data.service'

import { HttpClient} from '@angular/common/http';
import { CampaignService } from '../../providers/campaign.service';

import { ToastrService } from 'ngx-toastr'


import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'vex-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class SigninComponent implements OnInit {
  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;


  id: string = null;
  
  progressbar_visible = false;
  progressbar_value = 0;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              public userService: UserService,
              private _Activatedroute: ActivatedRoute,
              public authService: AuthenticationService,
              public dataService: DataService,
              public campService: CampaignService,
              private http: HttpClient,
              private toastr: ToastrService,
              public _loadingBar: SlimLoadingBarService
  ) {
    this._loadingBar.events.subscribe(items => {
      if(items.type == 0)
        this.progressbar_value = items.value;
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');      
    });
    
    // this.router.events.pipe( filter((event) => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //    this.previousUrl = this.currentUrl;
    //    this.currentUrl = event.url;
    //    console.log('prev:', event.url);
    // });
    
  }

  send() {
    this.router.navigate(['/']);
    this.snackbar.open('Lucky you! Looks like you didn\'t need a password or email address! For a real application we provide validators to prevent this. ;)', 'Got It!', {
      duration: 10000
    });
  }

  switchViewer(type) {
    
    if (type === 'panel/dashboard/home'){
      if(this.validateEmail(this.form.get('email').value)){
        if(this.form.get('email').value !== '' && this.form.get('password').value !== ''){
          
          this.progressbar_visible = true;
          this._loadingBar.start();
          if(this.id === 'brand'){
            // this.userService.afterLogin('advertiser'); 
            // this.router.navigate([type]);
            this.authService.login(this.form.get('email').value, this.form.get('password').value)
            .pipe(first())
            .subscribe(
              data => {
                console.log('data', data);
                // this.dataService.getMyAdvertiserProfile().pipe().subscribe((cdata : any) => { 
                  this.dataService.listOfAdvertisers().pipe().subscribe((cdata : any) => {
                  this.userService.afterLogin('advertiser'); 

                  this.userService.currentUser.avatar = cdata.results[0].profile_photo_url;
                  this.userService.currentUser.company = cdata.results[0].company_name;
                  this.userService.currentUser.email = this.form.get('email').value;
                  this.userService.currentUser.type = 'advertiser';
                  this.userService.currentUser.bio = cdata.results[0].about_company;
                  
                  this._loadingBar.complete();
                  this.router.navigate([type]);

                  localStorage.setItem('type', this.userService.currentUser.type);
                });
              },
              error => {
                // console.log('error',error.error.detail);
                this._loadingBar.complete();
                this.toastr.error('The email or password that you entered is not valid. Please try again or create a new account using sign up','', {
                  timeOut: 6000,
                  positionClass: 'toast-bottom-right',
                  progressBar: true
                });
            });
          }
          else{
            // this.userService.afterLogin('influencer');
            // this.router.navigate([type]);
            this.authService.login(this.form.get('email').value, this.form.get('password').value)
            .pipe(first())
            .subscribe(
              data => {
                console.log('data', data);
                
                this.dataService.getMyInfluencerProfile().pipe().subscribe((cdata : any) => { 
                  // this.loadingBar.complete();
                  this.userService.afterLogin('influencer');
                  console.log(cdata);
                  this.userService.currentUser.avatar = cdata.results[0].profile_photo_url;
                  this.userService.currentUser.fullName = cdata.results[0].first_name + ' ' + cdata.results[0].last_name;
                  this.userService.currentUser.email = this.form.get('email').value;
                  this.userService.currentUser.type = 'influencer';
                  this.userService.currentUser.bio = cdata.results[0].about_company;

                  this.userService.currentUser.profileId = cdata.results[0].profile_uuid;
                  // this.userService.currentUser.avatar = cdata[0].profile_photo_url;
                  // this.userService.currentUser.fullName = cdata[0].first_name + ' ' + cdata[0].last_name;
                  // this.userService.currentUser.email = this.form.get('email').value;
                  // this.userService.currentUser.type = 'influencer';
                  // this.userService.currentUser.bio = cdata[0].about_company;

                  this.userService.currentUserProfile.photo_img = this.userService.currentUser.avatar;
                  this.userService.currentUserProfile.name = this.userService.currentUser.fullName;

                  localStorage.setItem('type', this.userService.currentUser.type);
                  //this.userService.currentUserProfile.userid = this.userService.currentUser.userId;
                  // console.log(this.campService.profiles.find(elem => elem.id === this.userService.currentUser.userId ));
                  // this.campService.profiles.find(elem => elem.id === this.userService.currentUser.userId ).photo_img = this.userService.currentUser.avatar;
                  if(cdata.results[0].social_media_platforms != null) {
                    for(let ii = 0; ii < cdata.results[0].social_media_platforms.length; ii ++) {
                      if(cdata.results[0].social_media_platforms[ii].platform == 'Instagram') {
                        this.userService.currentUserProfile.followers = cdata.results[0].social_media_platforms[ii].platform_profile_summary.followers_count;
                        this.userService.currentUserProfile.posts = cdata.results[0].social_media_platforms[ii].platform_profile_summary.media_count;
      
                        this.userService.currentUserAnalyze[1].followers.value = this.userService.currentUserProfile.followers;
                        this.userService.currentUserAnalyze[1].platform = 'instagram';
      
                        this.userService.instaName = cdata.results[0].social_media_platforms[ii].platform_profile_summary.username;
                        this.userService.instaAvatar = cdata.results[0].social_media_platforms[ii].platform_profile_summary.profile_picture_url;
      
                        this.userService.instaLoginStatus = true;
                        
      
                        const now = new Date();
                        let media_time: string;
                        let media_month: number;
                        let media_date: number;
                        let media_year: number;
      
                        let numberLikes = 0;
                        let numberComments = 0;
                        let numberMedias = 0;
                        
                        let post_count = 0;
                        this.userService.currentUserAnalyze[1].post_urls = [];
                        
                        for(let i = 0; i < cdata.results[0].social_media_platforms[ii].posts.length; i ++){
                          media_time = cdata.results[0].social_media_platforms[ii].posts[i].timestamp;
                          
                          media_month = parseInt(media_time.slice(5,7));
                          media_date = parseInt(media_time.slice(8,10));
                          media_year = parseInt(media_time.slice(0,4));
                          
                          console.log('date', media_month, media_date, media_year, now.getMonth(), now.getDate());
      
                          // if((media_month > now.getMonth() && media_date <= now.getDate() && media_year == now.getFullYear()) || (media_month == now.getMonth() && media_date >= now.getDate() && media_year == now.getFullYear()) || (media_year == (now.getFullYear() - 1) && (now.getMonth() == 0)  && media_month == 12 && media_date >= now.getDate())) {
                          if( i < 10 ) { 
                            numberLikes = numberLikes + cdata.results[0].social_media_platforms[ii].posts[i].like_count;
                            numberComments = numberComments + cdata.results[0].social_media_platforms[ii].posts[i].comments_count;
                            numberMedias ++;     
                            
                            console.log('likes and comments', numberLikes, numberComments);
                          }
      
                          if(post_count < 3) {
                            if(cdata.results[0].social_media_platforms[ii].posts[i].media_type == 'IMAGE') {
                              this.userService.currentUserAnalyze[1].post_urls.push(cdata.results[0].social_media_platforms[ii].posts[i].media_url);
                              post_count ++;
                            }
                            
                          }
      
                        }
      
                        this.userService.currentUserAnalyze[1].comments.value = numberComments / 10;// / 30;
                        this.userService.currentUserAnalyze[1].likes.value = numberLikes / 10;// / 30;
                        if (cdata.results[0].social_media_platforms[ii].insights != null) {
                          for(let j = 0; j < cdata.results[0].social_media_platforms[ii].insights.length; j ++) {
                            if( cdata.results[0].social_media_platforms[ii].insights[j].name == 'impressions') {
                              const impre_len = cdata.results[0].social_media_platforms[ii].insights[j].values.length;
                              this.userService.currentUserAnalyze[1].posting.value = cdata.results[0].social_media_platforms[ii].insights[j].values[impre_len - 1].value;
                            }
                            if ( cdata.results[0].social_media_platforms[ii].insights[j].name == 'reach' ) {
                              const impre_len = cdata.results[0].social_media_platforms[ii].insights[j].values.length;
                              this.userService.currentUserAnalyze[1].rate.value = cdata.results[0].social_media_platforms[ii].insights[j].values[impre_len - 1].value;
                            }
                          }
                        }
                        else {
                          this.userService.currentUserAnalyze[1].rate.value = 0;
                          this.userService.currentUserAnalyze[1].posting.value = 0;
                        }
                        
                      }
                    }
                  }
                  
                  this._loadingBar.complete();
                  this.router.navigate([type]);
                });
              },
              error => {
                // console.log(error);
                this._loadingBar.complete();
                this.toastr.error('The email or password that you entered is not valid. Please try again or create a new account using sign up','', {
                  timeOut: 6000,
                  positionClass: 'toast-bottom-right',
                  progressBar: true
                });
            });
          }
          // "email": "dev12345@test.com",  influencer
          // "password": "1234"
          // "email": "test12345@test.com",  brand
          // "password": "1234"
        }
        else
          this.snackbar.open('Please fill out all fields', 'Got It!', {
            duration: 10000});
      }
      else {
        this.snackbar.open('Please enter a valid email', 'Got It!', {
          duration: 10000});
      }
    }
    else {      
        type = '/' + this.id + 'signup';
        this.router.navigate([type]);
    }
  }
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase()))
    {
      return (true)
    }
    return false;
  }
  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

 
}
