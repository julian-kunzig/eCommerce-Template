import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {UserService} from '../../../providers/user.service';

import { SocialAuthService } from '../../../../../dist/lib';
import { SocialUser } from '../../../../../dist/lib';
import { FacebookLoginProvider, GoogleLoginProvider, InstagramLoginProvider } from '../../../../../dist/lib';
import { HttpClient} from '@angular/common/http';

import { ModalService } from './_modal'


import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs';
import { CommentStmt } from '@angular/compiler';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

import { DataService } from '../../../providers/data.service'
import { first } from 'rxjs/operators';

export interface Comments {
  timestamp: string;
  text: string;
  id: number;
}
export interface MediaComp {
  comments_count: number;
  like_count: number;
  timestamp: string;
  id: number;
  comments: Comments;
}
export interface Instagram_Business_Account {
  name: string;
  username: string;
  ig_id: string;
  profile_picture_url: string;
  id: number;
  followers_count: number;
  media_count: number;
  media: any;
}
export interface PageInfo {  
  name: string;
  link: string;
  picture: any;
  id: number;
  instagram_business_account: Instagram_Business_Account;
  enableFlag: boolean;
}

export interface AuthData {
  access_token: any;
  business_account_id: string;
  platform_name: string;
}

@Component({
  selector: 'vex-user-social',
  templateUrl: './user-social.component.html',
  styleUrls: ['./user-social.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class UserSocialComponent implements OnInit {  

  user_google: SocialUser;
  user_fb: SocialUser;
  user_ins: SocialUser;
  

  GoogleLoginProvider = GoogleLoginProvider;
  FBLoginProvider = FacebookLoginProvider;
  InstagramLoginProvider = InstagramLoginProvider;
  ins_auth: boolean = this.userService.instaLoginStatus;

  selectedPage: PageInfo;
  pages: PageInfo[] = [];

  

  constructor(private route: ActivatedRoute,
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              private router: Router,
              private authService: SocialAuthService,
              public userService: UserService,
              private http: HttpClient,
              private toastr: ToastrService,
              private modalService: ModalService,
              private dataService: DataService
  ) {
      this.renderer.addClass(this.document.body, 'user-social');
  }

  ngOnInit(): void {
    this.authService.authState_google.subscribe(user => {
      this.user_google = user;
    });
    this.authService.authState_fb.subscribe(user => {
      this.user_fb = user;
      // if(user != null)
      //   this.insertPageInfoFB(user.response);
    });
    this.authService.authState_insta.subscribe(user => {
      this.user_ins = user;
      
    });    
  }

  closeModal() {
    this.modalService.close('insta_userlist_modal');
    this.toastr.error('User cancelled login or did not fully authorize.','', {
      timeOut: 6000,
      positionClass: 'toast-bottom-right',
      progressBar: true
    });
    this.pages = [];
    this.selectedPage = null;
    this.user_ins = null;
    this.ins_auth = false;
    this.userService.instaLoginStatus = false;
  }

  confirmModal() {
    if(this.selectedPage != null){
      this.user_ins.name = this.selectedPage.instagram_business_account.username;
      this.user_ins.photoUrl = this.selectedPage.instagram_business_account.profile_picture_url;

      this.userService.instaLoginStatus = true;
      this.ins_auth = true;

      this.modalService.close('insta_userlist_modal');

      // console.log(this.selectedPage);
      this.updateUserProfileInsta();

      let authData:AuthData = {
        access_token: this.user_ins.authToken,
        platform_name: this.user_ins.provider,
        business_account_id: this.selectedPage.instagram_business_account.ig_id
      };
      
      //this.sendAuthData(this.authData);  /// todo: send authData to the backend
    }
  }

  updateUserProfileInsta() {
    // this.profile = this.campService.profiles.find(elem => elem.id === this.userService.currentUser.userId );
    // this.campService.analysisData.find();
    this.userService.currentUserProfile.followers = this.selectedPage.instagram_business_account.followers_count;
    this.userService.currentUserProfile.posts = this.selectedPage.instagram_business_account.media_count;
    
    this.userService.currentUserAnalyze[1].followers.value = this.selectedPage.instagram_business_account.followers_count;
    this.userService.currentUserAnalyze[1].platform = 'instagram';
    //this.userService.currentUserAnalyze[1].posting.value = this.selectedPage.instagram_business_account.media_count;
    this.calcAnalyzeInsta();

  }

  calcAnalyzeInsta() {
    
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
    
    console.log('Insta Info', this.selectedPage);

    for(let i = 0; i < this.selectedPage.instagram_business_account.media_count; i ++){
      media_time = this.selectedPage.instagram_business_account.media.data[i].timestamp;
      
      media_month = parseInt(media_time.slice(5,7));
      media_date = parseInt(media_time.slice(8,10));
      media_year = parseInt(media_time.slice(0,4));
      
      // console.log(media_year, now.getFullYear());

      if((media_month >= now.getMonth() && media_date >= now.getDate() && media_year == now.getFullYear()) || (media_year == (now.getFullYear() - 1) && (now.getMonth() == 0)  && media_month == 12 && media_date >= now.getDate())) {
        numberLikes = numberLikes + this.selectedPage.instagram_business_account.media.data[i].like_count;
        numberComments = numberComments + this.selectedPage.instagram_business_account.media.data[i].comments_count;
        numberMedias ++;        
      }

      if(post_count < 3) {
        this.userService.currentUserAnalyze[1].post_urls.push(this.selectedPage.instagram_business_account.media.data[i].media_url);
        post_count ++;
        console.log(this.userService.currentUserAnalyze[1].post_urls);
      }

      console.log(this.userService.currentUserAnalyze[1].post_urls);
    }

    this.userService.currentUserAnalyze[1].comments.value = numberComments;// / 30;
    this.userService.currentUserAnalyze[1].likes.value = numberLikes;// / 30;
    this.userService.currentUserAnalyze[1].posting.value = numberMedias;// / 30;

    var num = (numberLikes + numberComments) / this.userService.currentUserAnalyze[1].followers.value * 100
    this.userService.currentUserAnalyze[1].rate.value = parseFloat(num.toFixed(2));

  }

  insertPageInfoInsta(payload: any) {
    let i;    
    for(i = 0; i < payload.data.length; i ++){
      this.pages.push(payload.data[i]);
      if(payload.data[i].instagram_business_account != null) {
        this.pages[i].enableFlag = false;
      }
      else {
        this.pages[i].enableFlag = true;
      }
    }
    
    this.modalService.open('insta_userlist_modal');
  }

  signInWithInsta() {
    console.log('sign instag', this.user_ins);
    if(!this.selectedPage)
      this.authService.signIn(InstagramLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        // this.user_ins = user;
        // this.insertPageInfoInsta(user.response);
        console.log(user, user.authToken);
        this.dataService.sendFacebookAccessToken(user.authToken)
        .pipe()
        .subscribe(data => {
          // console.log('backend',data);
          this.dataService.getMyInfluencerProfile().pipe().subscribe((content:any) => {
            console.log('after login with Insta',content);
            if(content.results[0].social_media_platforms != null) {
              for(let ii = 0; ii < content.results[0].social_media_platforms.length; ii ++) {
                if(content.results[0].social_media_platforms[ii].platform == 'Instagram') {
                  this.userService.currentUserProfile.followers = content.results[0].social_media_platforms[ii].platform_profile_summary.followers_count;
                  this.userService.currentUserProfile.posts = content.results[0].social_media_platforms[ii].platform_profile_summary.media_count;

                  this.userService.currentUserAnalyze[1].followers.value = this.userService.currentUserProfile.followers;
                  this.userService.currentUserAnalyze[1].platform = 'instagram';

                  this.userService.instaName = content.results[0].social_media_platforms[ii].platform_profile_summary.username;
                  this.userService.instaAvatar = content.results[0].social_media_platforms[ii].platform_profile_summary.profile_picture_url;

                  this.userService.instaLoginStatus = true;
                  this.ins_auth = true;

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
                  
                  for(let i = 0; i < content.results[0].social_media_platforms[ii].posts.length; i ++){
                    media_time = content.results[0].social_media_platforms[ii].posts[i].timestamp;
                    
                    media_month = parseInt(media_time.slice(5,7));
                    media_date = parseInt(media_time.slice(8,10));
                    media_year = parseInt(media_time.slice(0,4));
                    
                    console.log('date', media_month, media_date, media_year, now.getMonth(), now.getDate());

                    //if((media_month > now.getMonth() && media_date <= now.getDate() && media_year == now.getFullYear()) || (media_month == now.getMonth() && media_date >= now.getDate() && media_year == now.getFullYear()) || (media_year == (now.getFullYear() - 1) && (now.getMonth() == 0)  && media_month == 12 && media_date >= now.getDate())) {
                    if( i < 10 ) {  
                      numberLikes = numberLikes + content.results[0].social_media_platforms[ii].posts[i].like_count;
                      numberComments = numberComments + content.results[0].social_media_platforms[ii].posts[i].comments_count;
                      numberMedias ++;     
                      
                      console.log('likes and comments', numberLikes, numberComments);
                    }

                    if(post_count < 3) {
                      if(content.results[0].social_media_platforms[ii].posts[i].media_type == 'IMAGE') {
                        this.userService.currentUserAnalyze[1].post_urls.push(content.results[0].social_media_platforms[ii].posts[i].media_url);
                        post_count ++;
                      }
                      
                    }

                  }

                  this.userService.currentUserAnalyze[1].comments.value = numberComments / 10;// / 30;
                  this.userService.currentUserAnalyze[1].likes.value = numberLikes / 10;// / 30;

                  if (content.results[0].social_media_platforms[ii].insights != null) {
                    for(let j = 0; j < content.results[0].social_media_platforms[ii].insights.length; j ++) {
                      if( content.results[0].social_media_platforms[ii].insights[j].name == 'impressions') {
                        const impre_len = content.results[0].social_media_platforms[ii].insights[j].values.length;
                        this.userService.currentUserAnalyze[1].posting.value = content.results[0].social_media_platforms[ii].insights[j].values[impre_len - 1].value;
                      }
                      if ( content.results[0].social_media_platforms[ii].insights[j].name == 'reach' ) {
                        const impre_len = content.results[0].social_media_platforms[ii].insights[j].values.length;
                        this.userService.currentUserAnalyze[1].rate.value = content.results[0].social_media_platforms[ii].insights[j].values[impre_len - 1].value;
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
           
          })
        },
        error => {
          console.log(error);
        });
      })
      .catch((error) => {
        // console.log(error);
        this.toastr.error(error,'', {
          timeOut: 6000,
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      });
  }
 

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
      this.user_fb = user;
      let authData:AuthData = {
        access_token: user.authToken,
        platform_name: user.provider,
        business_account_id: user.id
      };

      //this.sendAuthData(this.authData);  /// todo: send authData to the backend
    })
    .catch((error) => {
      this.toastr.error('User cancelled login or did not fully authorize.','', {
        timeOut: 6000,
        positionClass: 'toast-bottom-right',
        progressBar: true
      });
    });
  }

  insertPageInfoFB(payload: any) {    
    console.log(payload);
    this.userService.currentUserAnalyze[0].followers.value = payload.friends.summary.total_count;
    this.userService.currentUserAnalyze[0].platform = 'facebook';
    this.calcAnalyzeFB(payload);
  }

  calcAnalyzeFB(fbInfo : any) {
    const now = new Date();
    let media_time: string;
    let media_month: number;
    let media_date: number;
    let media_year: number;

    let numberLikes = 0;
    let numberComments = 0;
    let numberMedias = 0;

    let post_count = 0;
    this.userService.currentUserAnalyze[0].post_urls = [];

    console.log('FB info', fbInfo);

    for(let i=0; i<fbInfo.posts.data.length; i++){
      media_time = fbInfo.posts.data[i].created_time;
      
      media_month = parseInt(media_time.slice(5,7));
      media_date = parseInt(media_time.slice(8,10));
      media_year = parseInt(media_time.slice(0,4));
      
      if((media_month >= now.getMonth() && media_date >= now.getDate() && media_year == now.getFullYear()) || (media_year == (now.getFullYear() - 1) && (now.getMonth() == 0) && media_month == 12 && media_date >= now.getDate())) {   
        numberMedias ++;
        
        if(fbInfo.posts.data[i].comments != null) {
          numberComments = numberComments + fbInfo.posts.data[i].comments.data.length;
        }
        
        if(fbInfo.posts.data[i].reactions != null) {
          if(fbInfo.posts.data[i].reactions.data[0].type == 'LIKE' || fbInfo.posts.data[i].reactions.data[0].type == 'LOVE' || fbInfo.posts.data[i].reactions.data[0].type == 'CARE') {
            numberLikes ++;
          }
        }
        
      }

      if(post_count < 3) {
        if(fbInfo.posts.data[i].full_picture != null)
        {
          this.userService.currentUserAnalyze[0].post_urls.push(fbInfo.posts.data[i].full_picture);
          post_count ++;
        }            
        console.log(this.userService.currentUserAnalyze[0].post_urls);
      }
    }

    this.userService.currentUserAnalyze[0].comments.value = numberComments;// / 30;
    this.userService.currentUserAnalyze[0].likes.value = numberLikes;// / 30;
    this.userService.currentUserAnalyze[0].posting.value = numberMedias;// / 30;

    var num = (numberLikes + numberComments) / this.userService.currentUserAnalyze[0].followers.value * 100
    this.userService.currentUserAnalyze[0].rate.value = parseFloat(num.toFixed(2));
  }

  signInWithFB(): void {
    if(!this.user_fb)
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
        // this.user_fb = user;
        console.log('fb',user.authToken, user);
        this.dataService.sendFacebookAccessToken(user.authToken)
        .pipe(first())
        .subscribe(data => {
          // console.log('backend',data);
          this.dataService.getMyInfluencerProfile().pipe().subscribe(content => {
            console.log('after login with FB',content);
          })
        },
        error => {
          console.log(error);
        });

        //this.insertPageInfoFB(user.response);
        let authData:AuthData = {
          access_token: user.authToken,
          platform_name: user.provider,
          business_account_id: user.id
        };
  
        //this.sendAuthData(this.authData);  /// todo: send authData to the backend
      }).catch((error) => {
        this.toastr.error(error,'', {
          timeOut: 6000,
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      });
  }
  signOutWithGoogle(): void {
    this.authService.signOut(GoogleLoginProvider.PROVIDER_ID);
  }
  signOutWithFB(): void {
    if(this.user_fb){
      this.authService.signOut(FacebookLoginProvider.PROVIDER_ID);
      this.userService.currentUserAnalyze[0].platform = '';
    }
  }

  signOutWithIns(): void {
    if(this.userService.instaLoginStatus) 
    {
      // this.authService.signOut(InstagramLoginProvider.PROVIDER_ID);
      // if(this.fb_flag) {
      //   this.user_fb = null;
      //   this.userService.currentUserAnalyze[0].platform = '';
      //   this.fb_flag = false;
      //   this.signInWithFB();
      // }
      
      this.dataService.disconnectFB()
      .pipe()
      .subscribe(cdata => {
        console.log('disconnet fb', cdata);
        this.user_ins = null;
        this.ins_auth = false;
        this.pages = [];
        this.selectedPage = null;
        this.userService.currentUserAnalyze[1].platform = '';
        this.userService.instaLoginStatus = false;
        this.userService.instaAvatar = null;
        this.userService.instaName = null;
      })
    }
    
  }
  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
 
  sendAuthData(param: AuthData): Observable<any> {  /// function to send user info to backend (user info : business account id => user.id, platform name => user.provider, access_token => user.authToken)
    return this.http.post('https://localhost:8000/accounts/token', param);  /// change url to backend url
  }
}
