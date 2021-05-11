import { Injectable } from '@angular/core';
import {BankAcc, CCard} from '../pages/campaign/interfaces/payment.interface';
import {Profile, Analyze} from '../pages/campaign/interfaces/profile.interface';
import {profileData} from '../../static-data/profiles';
import {DataService} from './data.service';


export interface User {
    userId: number;
    type: 'advertiser' | 'influencer';
    avatar: string;
    email: string;
    phone?: string;
    fullName: string;
    company?: string;
    birthDay?: string;
    gender?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    cCards?: CCard[];
    bankAccount?: BankAcc;
    category?: string[];
    bio?: string;
    brandsite?: string;
    profileId: number;
}

@Injectable({
    providedIn: 'root'
})

/*Brief explanation of what to do here: If the user chooses to log in as an advertiser you'll make an API call using a
a function from the data service in to get that person's data using the API endpoint (accounts/advertiser/me). To make
things easier I created an authentication service that stores the JWT in localstorage(you need to add the access token
to any request you make to the backend). All you need to do is to add the JWT to every request (i suggest that you
modularize this by adding it to all possible METHODS).
*/
export class UserService {
    currentUser: User;
    currentUserAnalyze: Analyze[] = [
        {
          profile_id: 1,
          platform: '',
          followers: {
              value: 0,
              change: 0,
          },
          likes: {
              value: 0,
              change: 0,
          },
          posting: {
              value: 0,
              change: 0,
          },
          comments: {
              value: 0,
              change: 0,
          },
          rate: {
              value: 0,
          },
          post_urls: [],
      },
      {
          profile_id: 1,
          platform: '',
          followers: {
              value: 0,
              change: 0,
          },
          likes: {
              value: 0,
              change: 0,
          },
          posting: {
              value: 0,
              change: 0,
          },
          comments: {
              value: 0,
              change: 0,
          },
          rate: {
              value: 0,
          },
          post_urls: [],
      }
    ];
    currentUserProfile: Profile;
    profiles = profileData;

    instaLoginStatus: boolean = false;
    instaAvatar: string = null;
    instaName: string = null;

    constructor(private dataService: DataService,) {
        this.userInit();
    }
    get Profile(): Profile {
        const profile = this.profiles.find(p => p.id === Number(this.currentUser.userId));
        return profile;
    }
    userInit() {
        console.log('access_token', localStorage.getItem('access_token'), localStorage.getItem('type'));
        const type = localStorage.getItem('type');
        if (type === 'advertiser') {
            this.currentUser = {
                userId: 7,
                avatar: '../../../../assets/img/brand.png',
                email: 'seonghyebin@gmail.com',
                fullName: 'Hyebin Seong',
                birthDay: '09/20/1990',
                phone: '(314) 920-3832',
                gender: 'female',
                type: 'advertiser',
                company: 'Nike, Inc',
                brandsite: 'http://www.nike.com',
                bio: 'NIKE is an American multinational corporation sales of footwear, apparel, equipment, accessories, and services. It is the world’s largest supplier of athletic shoes and apparel.',
                category: ['beauty', 'technology'],
                profileId: 1,
            };
        }else{
            this.currentUser = {
                userId: 1,
                avatar: '../../../../assets/img/demo/profile-photo-01.png',
                email: 'Kaitlyn_Kristy2@gmail.com',
                fullName: 'Kaitlyn Kristy',
                birthDay: '09/20/1990',
                phone: '(314) 920-3832',
                gender: 'female',
                type: 'influencer',
                category: [],
                profileId: 1,
            };
            this.currentUserProfile = {
                id: 1,
                profile_bg: '../../../../assets/img/demo/profile-bg-01.jpg',
                photo_img: '../../../../assets/img/demo/profile-photo-01.png',
                name: 'Kaitlyn Kristy',
                userid: 'Kaitlyn_Kristy2',
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
            
        };
        
        if(localStorage.getItem('access_token') != null){
            if(type == 'advertiser') {
                console.log('init user service advertiser');
                this.dataService.getMyAdvertiserProfile()
                .pipe()
                .subscribe((data: any) => {
                    // this.afterLogin('advertiser'); 

                    console.log(data);
                    this.currentUser.avatar = data.results[0].profile_photo_url;
                    this.currentUser.company = data.results[0].company_name;
                    //this.currentUser.email = this.form.get('email').value;
                    this.currentUser.type = 'advertiser';
                    this.currentUser.bio = data.results[0].about_company;
                    this.currentUser.profileId = data.results[0].profile_uuid;
                })
            }
            else {
                this.dataService.getMyInfluencerProfile()
                .pipe()
                .subscribe((cdata: any) => {
                    // this.afterLogin('influencer');
                    console.log('init user service advertiser', cdata);
                    // this.userService.currentUser.avatar = cdata.results[0].profile_photo_url;
                    // this.userService.currentUser.fullName = cdata.results[0].first_name + ' ' + cdata.results[0].last_name;
                    // this.userService.currentUser.email = this.form.get('email').value;
                    // this.userService.currentUser.type = 'influencer';
                    // this.userService.currentUser.bio = cdata.results[0].about_company;

                    this.currentUser.avatar = cdata.results[0].profile_photo_url;
                    this.currentUser.fullName = cdata.results[0].first_name + ' ' + cdata.results[0].last_name;

                    this.currentUser.profileId = cdata.results[0].profile_uuid;
                    //this.currentUser.email = this.form.get('email').value;
                    this.currentUser.type = 'influencer';
                    this.currentUser.bio = cdata.results[0].about_company;

                    this.currentUserProfile.photo_img = this.currentUser.avatar;
                    this.currentUserProfile.name = this.currentUser.fullName;

                    if(cdata.results[0].social_media_platforms != null) {
                        for(let ii = 0; ii < cdata.results[0].social_media_platforms.length; ii ++) {
                          if(cdata.results[0].social_media_platforms[ii].platform == 'Instagram') {
                            this.currentUserProfile.followers = cdata.results[0].social_media_platforms[ii].platform_profile_summary.followers_count;
                            this.currentUserProfile.posts = cdata.results[0].social_media_platforms[ii].platform_profile_summary.media_count;
          
                            this.currentUserAnalyze[1].followers.value = this.currentUserProfile.followers;
                            this.currentUserAnalyze[1].platform = 'instagram';
          
                            this.instaName = cdata.results[0].social_media_platforms[ii].platform_profile_summary.username;
                            this.instaAvatar = cdata.results[0].social_media_platforms[ii].platform_profile_summary.profile_picture_url;
          
                            this.instaLoginStatus = true;
                            
          
                            const now = new Date();
                            let media_time: string;
                            let media_month: number;
                            let media_date: number;
                            let media_year: number;
          
                            let numberLikes = 0;
                            let numberComments = 0;
                            let numberMedias = 0;
                            
                            let post_count = 0;
                            this.currentUserAnalyze[1].post_urls = [];
                            
                            for(let i = 0; i < cdata.results[0].social_media_platforms[ii].posts.length; i ++){
                              media_time = cdata.results[0].social_media_platforms[ii].posts[i].timestamp;
                              
                              media_month = parseInt(media_time.slice(5,7));
                              media_date = parseInt(media_time.slice(8,10));
                              media_year = parseInt(media_time.slice(0,4));
                              
                              console.log('date', media_month, media_date, media_year, now.getMonth(), now.getDate());
          
                            //   if((media_month > now.getMonth() && media_date <= now.getDate() && media_year == now.getFullYear()) || (media_month == now.getMonth() && media_date >= now.getDate() && media_year == now.getFullYear()) || (media_year == (now.getFullYear() - 1) && (now.getMonth() == 0)  && media_month == 12 && media_date >= now.getDate())) {
                            if( i < 10 ) { 
                                numberLikes = numberLikes + cdata.results[0].social_media_platforms[ii].posts[i].like_count;
                                numberComments = numberComments + cdata.results[0].social_media_platforms[ii].posts[i].comments_count;
                                numberMedias ++;     
                                
                                console.log('likes and comments', numberLikes, numberComments);
                              }
          
                              if(post_count < 3) {
                                if(cdata.results[0].social_media_platforms[ii].posts[i].media_type == 'IMAGE') {
                                  this.currentUserAnalyze[1].post_urls.push(cdata.results[0].social_media_platforms[ii].posts[i].media_url);
                                  post_count ++;
                                }
                                
                              }
          
                            }
          
                            this.currentUserAnalyze[1].comments.value = numberComments / 10;// / 30;
                            this.currentUserAnalyze[1].likes.value = numberLikes / 10;// / 30;
          
                            if (cdata.results[0].social_media_platforms[ii].insights != null) {
                                for(let j = 0; j < cdata.results[0].social_media_platforms[ii].insights.length; j ++) {
                                  if( cdata.results[0].social_media_platforms[ii].insights[j].name == 'impressions') {
                                    const impre_len = cdata.results[0].social_media_platforms[ii].insights[j].values.length;
                                    this.currentUserAnalyze[1].posting.value = cdata.results[0].social_media_platforms[ii].insights[j].values[impre_len - 1].value;
                                  }
                                  if ( cdata.results[0].social_media_platforms[ii].insights[j].name == 'reach' ) {
                                    const impre_len = cdata.results[0].social_media_platforms[ii].insights[j].values.length;
                                    this.currentUserAnalyze[1].rate.value = cdata.results[0].social_media_platforms[ii].insights[j].values[impre_len - 1].value;
                                  }
                                }
                              }
                              else {
                                this.currentUserAnalyze[1].rate.value = 0;
                                this.currentUserAnalyze[1].posting.value = 0;
                              }
                            
                          }
                        }
                      }
                })
            }
        }
    }
    afterLogin(type) {
        if (type === 'advertiser') {
            this.currentUser = {
                userId: 7,
                avatar: '../../../../assets/img/brand.png',
                email: 'seonghyebin@gmail.com',
                fullName: 'Hyebin Seong',
                birthDay: '09/20/1990',
                phone: '(314) 920-3832',
                gender: 'female',
                type: 'advertiser',
                company: 'Nike, Inc',
                brandsite: 'http://www.nike.com',
                bio: 'NIKE is an American multinational corporation sales of footwear, apparel, equipment, accessories, and services. It is the world’s largest supplier of athletic shoes and apparel.',
                category: ['beauty', 'technology'],
                profileId: 1,
            };
        }else{
            this.currentUser = {
                userId: 1,
                avatar: '../../../../assets/img/demo/profile-photo-01.png',
                email: 'Kaitlyn_Kristy2@gmail.com',
                fullName: 'Kaitlyn Kristy',
                birthDay: '09/20/1990',
                phone: '(314) 920-3832',
                gender: 'female',
                type: 'influencer',
                category: [],
                profileId: 1,
            };
            this.currentUserProfile = {
                id: 1,
                profile_bg: '../../../../assets/img/demo/profile-bg-01.jpg',
                photo_img: '../../../../assets/img/demo/profile-photo-01.png',
                name: 'Kaitlyn Kristy',
                userid: 'Kaitlyn_Kristy2',
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
            
        }
    }
}
