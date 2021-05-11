import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';

declare let FB: any;

export class InstagramLoginProvider extends BaseLoginProvider {
  public static readonly PROVIDER_ID: string = 'INSTAGRAM';

  constructor(
    private clientId: string,
    private initOptions: any = {
      scope: 'email,public_profile,read_insights,pages_show_list,instagram_basic,instagram_manage_insights,pages_read_engagement', //,instagram_basic,pages_show_list
      locale: 'en_US',
      fields: 'id',
      version: 'v4.0',
    },
    private initInstaOptions: any = {
        feilds: 'username, profile_picture_url'
    }
  ) {
    super();
  }

  initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.loadScript(
            InstagramLoginProvider.PROVIDER_ID,
          `//connect.facebook.net/${this.initOptions.locale}/sdk.js`,
          () => {
            FB.init({
              appId: this.clientId,
              autoLogAppEvents: true,
              cookie: true,
              xfbml: true,
              version: this.initOptions.version,
            });

            resolve();
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  getLoginStatus(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response: any) => {
        if (response.status === 'connected') {
          let authResponse = response.authResponse;
          let user: SocialUser = new SocialUser();
          // user.response = fbUser;
          user.authToken = authResponse.accessToken;
          FB.api(`/me/accounts? fields=instagram_business_account{name, username, ig_id, profile_picture_url, followers_count, media_count, media{comments_count, like_count, timestamp, comments, media_url}}, name, link, picture`, (fbUser: any) => {
            user.response = fbUser;
            // user.authToken = authResponse;
            if(fbUser.data.length !== 0){
              let i;
              let flag = false;
              for(i = 0; i < fbUser.data.length; i ++) {
                if (fbUser.data[i].instagram_business_account != null && fbUser.data[i].id != null){
                  flag = true;
                  user.name = fbUser.data[i].instagram_business_account.username;  // todo
                  user.photoUrl = fbUser.data[i].instagram_business_account.profile_picture_url;  //todo               
                }
              }
              if (flag) {
                resolve(user);
              }
              else
                reject('User cancelled login or did not fully authorize.');
            }
            else
              reject('User cancelled login or did not fully authorize.');
          });
        } else {
          reject(`No user is currently logged in with ${InstagramLoginProvider.PROVIDER_ID}`);
        }
      });
    });
  }

  signIn(signInOptions?: any): Promise<SocialUser> {
    const options = { ...this.initOptions, ...signInOptions };
    return new Promise((resolve, reject) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          let authResponse = response.authResponse;
          let user: SocialUser = new SocialUser();
          user.authToken = authResponse.accessToken;
          // resolve(user);
          FB.api(`/me/accounts? fields=instagram_business_account{name, username, ig_id, profile_picture_url, followers_count, media_count, media{comments_count, like_count, timestamp, comments, media_url}}, name, link, picture`, (fbUser: any) => {
            user.response = fbUser;
            
            if(fbUser.data.length !== 0){
              let i;
              let flag = false;
              for(i = 0; i < fbUser.data.length; i ++) {
                if (fbUser.data[i].instagram_business_account != null && fbUser.data[i].id != null){
                  flag = true;
                }
              }
              if (flag) {
                resolve(user);
              }
              else
                reject('User cancelled login or did not fully authorize.');
            }
            else
              reject('User cancelled login or did not fully authorize.');
          });
          
       
        } else {
          reject('User cancelled login or did not fully authorize.');
        }
      }, options);
    });
  }

  signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      FB.logout((response: any) => {
        resolve();
      });
    });
  }
}
