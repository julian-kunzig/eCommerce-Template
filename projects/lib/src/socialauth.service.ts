import { Inject, Injectable } from '@angular/core';
import { AsyncSubject, Observable, ReplaySubject } from 'rxjs';
import { LoginProvider } from './entities/login-provider';
import { SocialUser } from './entities/social-user';
import { FacebookLoginProvider } from './providers/facebook-login-provider';
import { GoogleLoginProvider } from './providers/google-login-provider';

export interface SocialAuthServiceConfig {
  autoLogin?: boolean;
  providers: { id: string; provider: LoginProvider }[];
  onError?: (error: any) => any;
}

/** @dynamic */
@Injectable()
export class SocialAuthService {
  private static readonly ERR_LOGIN_PROVIDER_NOT_FOUND =
    'Login provider not found';
  private static readonly ERR_NOT_LOGGED_IN = 'Not logged in';
  private static readonly ERR_NOT_INITIALIZED =
    'Login providers not ready yet. Are there errors on your console?';
  private static readonly ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN =
    'Chosen login provider is not supported for refreshing a token';

  private providers: Map<string, LoginProvider> = new Map();
  private autoLogin = false;

  private _user_google: SocialUser = null;
  private _user_fb: SocialUser = null;
  private _user_insta: SocialUser = null;
  private _authState_google: ReplaySubject<SocialUser> = new ReplaySubject(1);
  private _authState_fb: ReplaySubject<SocialUser> = new ReplaySubject(1);
  private _authState_insta: ReplaySubject<SocialUser> = new ReplaySubject(1);

  /* Consider making this an enum comprising LOADING, LOADED, FAILED etc. */
  private initialized = false;
  private _initState: AsyncSubject<boolean> = new AsyncSubject();

  get authState_google(): Observable<SocialUser> {
    return this._authState_google.asObservable();
  }

  get authState_fb(): Observable<SocialUser> {
    return this._authState_fb.asObservable();
  }

  get authState_insta(): Observable<SocialUser> {
    return this._authState_insta.asObservable();
  }

  get initState(): Observable<boolean> {
    return this._initState.asObservable();
  }

  constructor(
    @Inject('SocialAuthServiceConfig')
    config: SocialAuthServiceConfig | Promise<SocialAuthServiceConfig>
  ) {
    if (config instanceof Promise) {
      config.then((config) => {
        this.initialize(config);
      });
    } else {
      this.initialize(config);
    }
  }

  private initialize(config: SocialAuthServiceConfig) {
    this.autoLogin = config.autoLogin !== undefined ? config.autoLogin : false;
    const { onError = console.error } = config;

    config.providers.forEach((item) => {
      this.providers.set(item.id, item.provider);
    });

    Promise.all(
      Array.from(this.providers.values()).map((provider) =>
        provider.initialize()
      )
    )
      .then(() => {
        if (this.autoLogin) {
          const loginStatusPromises = [];
          let loggedIn_google = false;
          let loggedIn_fb = false;
          let loggedIn_insta = false;
          this.providers.forEach((provider: LoginProvider, key: string) => {
            let promise = provider.getLoginStatus();
            loginStatusPromises.push(promise);
            promise
              .then((user: SocialUser) => {
                user.provider = key;

                if(key === GoogleLoginProvider.PROVIDER_ID) {
                  this._user_google = user;
                  this._authState_google.next(user);
                  loggedIn_google = true;  //todo
                }
                else if (key === FacebookLoginProvider.PROVIDER_ID)
                {
                  this._user_fb = user;
                  this._authState_fb.next(user);
                  loggedIn_fb = true
                }
                else
                {
                  this._user_insta = user;
                  this._authState_insta.next(user);
                  loggedIn_insta = true
                }
                
              })
              .catch(console.debug);
          });
          Promise.all(loginStatusPromises).catch(() => {
            if (!loggedIn_fb) {
              this._user_fb = null;  //todo
              this._authState_fb.next(null);
            }
            if (!loggedIn_google) {
              this._user_google = null;  //todo
              this._authState_google.next(null);
            }
            if (!loggedIn_insta) {
              this._user_insta = null;  //todo
              this._authState_insta.next(null);
            }
          });
        }
      })
      .catch((error) => {
        onError(error);
      })
      .finally(() => {
        this.initialized = true;
        this._initState.next(this.initialized);
        this._initState.complete();
      });
  }

  refreshAuthToken(providerId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.initialized) {
        reject(SocialAuthService.ERR_NOT_INITIALIZED);
      } else if (providerId !== GoogleLoginProvider.PROVIDER_ID) {
        reject(SocialAuthService.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN);
      } else {
        const providerObject = this.providers.get(providerId);
        if (providerObject) {
          providerObject
            .getLoginStatus({refreshToken: true})
            .then((user: SocialUser) => {
              user.provider = providerId;
              if(providerId === GoogleLoginProvider.PROVIDER_ID) {
                this._user_google = user;
                this._authState_google.next(user);
              }
              else if (providerId === FacebookLoginProvider.PROVIDER_ID)
              {
                this._user_fb = user;
                this._authState_fb.next(user);
              }
              else {
                this._user_insta = user;
                this._authState_insta.next(user);
              }
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
        }
      }
    });
  }

  signIn(providerId: string, signInOptions?: any): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      if (!this.initialized) {
        reject(SocialAuthService.ERR_NOT_INITIALIZED);
      } else {
        let providerObject = this.providers.get(providerId);
        if (providerObject) {
          providerObject
            .signIn(signInOptions)
            .then((user: SocialUser) => {
              user.provider = providerId;
              resolve(user);

              if(providerId === GoogleLoginProvider.PROVIDER_ID) {
                this._user_google = user;
                this._authState_google.next(user);
              }
              else if (providerId === FacebookLoginProvider.PROVIDER_ID)
              {
                this._user_fb = user;
                this._authState_fb.next(user);
              }
              else {
                this._user_insta = user;
                this._authState_insta.next(user);
              }
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
        }
      }
    });
  }

  signOut(providerId: string, revoke: boolean = false): Promise<void> {
    console.log(providerId);
    if(providerId === GoogleLoginProvider.PROVIDER_ID) {
      return new Promise((resolve, reject) => {
        if (!this.initialized) {
          reject(SocialAuthService.ERR_NOT_INITIALIZED);
        } else if (!this._user_google) {
          reject(SocialAuthService.ERR_NOT_LOGGED_IN);
        } else {
          let providerId = this._user_google.provider;
          let providerObject = this.providers.get(providerId);
          if (providerObject) {
            providerObject
              .signOut(revoke)
              .then(() => {
                resolve();
  
                this._user_google = null;
                this._authState_google.next(null);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
          }
        }
      });
    }
    else if(providerId === FacebookLoginProvider.PROVIDER_ID) {
      return new Promise((resolve, reject) => {
        if (!this.initialized) {
          reject(SocialAuthService.ERR_NOT_INITIALIZED);
        } else if (!this._user_fb) {
          reject(SocialAuthService.ERR_NOT_LOGGED_IN);
        } else {
          let providerId = this._user_fb.provider;
          let providerObject = this.providers.get(providerId);
          if (providerObject) {
            providerObject
              .signOut(revoke)
              .then(() => {
                resolve();
  
                this._user_fb = null;
                this._authState_fb.next(null);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
          }
        }
      });
    }
    else {
      return new Promise((resolve, reject) => {
        if (!this.initialized) {
          reject(SocialAuthService.ERR_NOT_INITIALIZED);
        } else if (!this._user_insta) {
          reject(SocialAuthService.ERR_NOT_LOGGED_IN);
        } else {
          let providerId = this._user_insta.provider;
          let providerObject = this.providers.get(providerId);
          if (providerObject) {
            providerObject
              .signOut(revoke)
              .then(() => {
                resolve();
  
                this._user_insta = null;
                this._authState_insta.next(null);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
          }
        }
      });
    }
  }
}
