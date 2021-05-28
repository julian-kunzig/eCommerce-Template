import { Inject, Injectable } from '@angular/core';
import { AsyncSubject, ReplaySubject } from 'rxjs';
import { FacebookLoginProvider } from './providers/facebook-login-provider';
import { GoogleLoginProvider } from './providers/google-login-provider';
import * as i0 from "@angular/core";
/** @dynamic */
export class SocialAuthService {
    constructor(config) {
        this.providers = new Map();
        this.autoLogin = false;
        this._user_google = null;
        this._user_fb = null;
        this._user_insta = null;
        this._authState_google = new ReplaySubject(1);
        this._authState_fb = new ReplaySubject(1);
        this._authState_insta = new ReplaySubject(1);
        /* Consider making this an enum comprising LOADING, LOADED, FAILED etc. */
        this.initialized = false;
        this._initState = new AsyncSubject();
        if (config instanceof Promise) {
            config.then((config) => {
                this.initialize(config);
            });
        }
        else {
            this.initialize(config);
        }
    }
    get authState_google() {
        return this._authState_google.asObservable();
    }
    get authState_fb() {
        return this._authState_fb.asObservable();
    }
    get authState_insta() {
        return this._authState_insta.asObservable();
    }
    get initState() {
        return this._initState.asObservable();
    }
    initialize(config) {
        this.autoLogin = config.autoLogin !== undefined ? config.autoLogin : false;
        const { onError = console.error } = config;
        config.providers.forEach((item) => {
            this.providers.set(item.id, item.provider);
        });
        Promise.all(Array.from(this.providers.values()).map((provider) => provider.initialize()))
            .then(() => {
            if (this.autoLogin) {
                const loginStatusPromises = [];
                let loggedIn_google = false;
                let loggedIn_fb = false;
                let loggedIn_insta = false;
                this.providers.forEach((provider, key) => {
                    let promise = provider.getLoginStatus();
                    loginStatusPromises.push(promise);
                    promise
                        .then((user) => {
                        user.provider = key;
                        if (key === GoogleLoginProvider.PROVIDER_ID) {
                            this._user_google = user;
                            this._authState_google.next(user);
                            loggedIn_google = true; //todo
                        }
                        else if (key === FacebookLoginProvider.PROVIDER_ID) {
                            this._user_fb = user;
                            this._authState_fb.next(user);
                            loggedIn_fb = true;
                        }
                        else {
                            this._user_insta = user;
                            this._authState_insta.next(user);
                            loggedIn_insta = true;
                        }
                    })
                        .catch(console.debug);
                });
                Promise.all(loginStatusPromises).catch(() => {
                    if (!loggedIn_fb) {
                        this._user_fb = null; //todo
                        this._authState_fb.next(null);
                    }
                    if (!loggedIn_google) {
                        this._user_google = null; //todo
                        this._authState_google.next(null);
                    }
                    if (!loggedIn_insta) {
                        this._user_insta = null; //todo
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
    refreshAuthToken(providerId) {
        return new Promise((resolve, reject) => {
            if (!this.initialized) {
                reject(SocialAuthService.ERR_NOT_INITIALIZED);
            }
            else if (providerId !== GoogleLoginProvider.PROVIDER_ID) {
                reject(SocialAuthService.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN);
            }
            else {
                const providerObject = this.providers.get(providerId);
                if (providerObject) {
                    providerObject
                        .getLoginStatus({ refreshToken: true })
                        .then((user) => {
                        user.provider = providerId;
                        if (providerId === GoogleLoginProvider.PROVIDER_ID) {
                            this._user_google = user;
                            this._authState_google.next(user);
                        }
                        else if (providerId === FacebookLoginProvider.PROVIDER_ID) {
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
                }
                else {
                    reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    }
    signIn(providerId, signInOptions) {
        return new Promise((resolve, reject) => {
            if (!this.initialized) {
                reject(SocialAuthService.ERR_NOT_INITIALIZED);
            }
            else {
                let providerObject = this.providers.get(providerId);
                if (providerObject) {
                    providerObject
                        .signIn(signInOptions)
                        .then((user) => {
                        user.provider = providerId;
                        resolve(user);
                        if (providerId === GoogleLoginProvider.PROVIDER_ID) {
                            this._user_google = user;
                            this._authState_google.next(user);
                        }
                        else if (providerId === FacebookLoginProvider.PROVIDER_ID) {
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
                }
                else {
                    reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    }
    signOut(providerId, revoke = false) {
        console.log(providerId);
        if (providerId === GoogleLoginProvider.PROVIDER_ID) {
            return new Promise((resolve, reject) => {
                if (!this.initialized) {
                    reject(SocialAuthService.ERR_NOT_INITIALIZED);
                }
                else if (!this._user_google) {
                    reject(SocialAuthService.ERR_NOT_LOGGED_IN);
                }
                else {
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
                    }
                    else {
                        reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                    }
                }
            });
        }
        else if (providerId === FacebookLoginProvider.PROVIDER_ID) {
            return new Promise((resolve, reject) => {
                if (!this.initialized) {
                    reject(SocialAuthService.ERR_NOT_INITIALIZED);
                }
                else if (!this._user_fb) {
                    reject(SocialAuthService.ERR_NOT_LOGGED_IN);
                }
                else {
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
                    }
                    else {
                        reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                    }
                }
            });
        }
        else {
            return new Promise((resolve, reject) => {
                if (!this.initialized) {
                    reject(SocialAuthService.ERR_NOT_INITIALIZED);
                }
                else if (!this._user_insta) {
                    reject(SocialAuthService.ERR_NOT_LOGGED_IN);
                }
                else {
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
                    }
                    else {
                        reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                    }
                }
            });
        }
    }
}
SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
SocialAuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
SocialAuthService.ERR_NOT_INITIALIZED = 'Login providers not ready yet. Are there errors on your console?';
SocialAuthService.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN = 'Chosen login provider is not supported for refreshing a token';
SocialAuthService.ɵfac = function SocialAuthService_Factory(t) { return new (t || SocialAuthService)(i0.ɵɵinject('SocialAuthServiceConfig')); };
SocialAuthService.ɵprov = i0.ɵɵdefineInjectable({ token: SocialAuthService, factory: SocialAuthService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SocialAuthService, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: ['SocialAuthServiceConfig']
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2FsZXhoL0Rlc2t0b3AvaW5maW5vdmFlL3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJzb2NpYWxhdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBUXhFLGVBQWU7QUFFZixNQUFNLE9BQU8saUJBQWlCO0lBdUM1QixZQUVFLE1BQWtFO1FBaEM1RCxjQUFTLEdBQStCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDbEQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixpQkFBWSxHQUFlLElBQUksQ0FBQztRQUNoQyxhQUFRLEdBQWUsSUFBSSxDQUFDO1FBQzVCLGdCQUFXLEdBQWUsSUFBSSxDQUFDO1FBQy9CLHNCQUFpQixHQUE4QixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxrQkFBYSxHQUE4QixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxxQkFBZ0IsR0FBOEIsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0UsMEVBQTBFO1FBQ2xFLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGVBQVUsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXNCN0QsSUFBSSxNQUFNLFlBQVksT0FBTyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZ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RCwwQkFBMEIsQ0FBQztBQUNMLG1DQUFpQixHQUFHLGVBQWUsQ0FBQztBQUNwQyxxQ0FBbUIsR0FDekMsa0VBQWtFLENBQUM7QUFDN0MscURBQW1DLEdBQ3pELCtEQUErRCxDQUFDO2tGQVB2RCxpQkFBaUIsY0F3Q2xCLHlCQUF5Qjt5REF4Q3hCLGlCQUFpQixXQUFqQixpQkFBaUI7a0RBQWpCLGlCQUFpQjtjQUQ3QixVQUFVOztzQkF5Q04sTUFBTTt1QkFBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQXN5bmNTdWJqZWN0LCBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExvZ2luUHJvdmlkZXIgfSBmcm9tICcuL2VudGl0aWVzL2xvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4vZW50aXRpZXMvc29jaWFsLXVzZXInO1xyXG5pbXBvcnQgeyBGYWNlYm9va0xvZ2luUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9mYWNlYm9vay1sb2dpbi1wcm92aWRlcic7XHJcbmltcG9ydCB7IEdvb2dsZUxvZ2luUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9nb29nbGUtbG9naW4tcHJvdmlkZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTb2NpYWxBdXRoU2VydmljZUNvbmZpZyB7XHJcbiAgYXV0b0xvZ2luPzogYm9vbGVhbjtcclxuICBwcm92aWRlcnM6IHsgaWQ6IHN0cmluZzsgcHJvdmlkZXI6IExvZ2luUHJvdmlkZXIgfVtdO1xyXG4gIG9uRXJyb3I/OiAoZXJyb3I6IGFueSkgPT4gYW55O1xyXG59XHJcblxyXG4vKiogQGR5bmFtaWMgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU29jaWFsQXV0aFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVSUl9MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQgPVxyXG4gICAgJ0xvZ2luIHByb3ZpZGVyIG5vdCBmb3VuZCc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRVJSX05PVF9MT0dHRURfSU4gPSAnTm90IGxvZ2dlZCBpbic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRVJSX05PVF9JTklUSUFMSVpFRCA9XHJcbiAgICAnTG9naW4gcHJvdmlkZXJzIG5vdCByZWFkeSB5ZXQuIEFyZSB0aGVyZSBlcnJvcnMgb24geW91ciBjb25zb2xlPyc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRVJSX05PVF9TVVBQT1JURURfRk9SX1JFRlJFU0hfVE9LRU4gPVxyXG4gICAgJ0Nob3NlbiBsb2dpbiBwcm92aWRlciBpcyBub3Qgc3VwcG9ydGVkIGZvciByZWZyZXNoaW5nIGEgdG9rZW4nO1xyXG5cclxuICBwcml2YXRlIHByb3ZpZGVyczogTWFwPHN0cmluZywgTG9naW5Qcm92aWRlcj4gPSBuZXcgTWFwKCk7XHJcbiAgcHJpdmF0ZSBhdXRvTG9naW4gPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBfdXNlcl9nb29nbGU6IFNvY2lhbFVzZXIgPSBudWxsO1xyXG4gIHByaXZhdGUgX3VzZXJfZmI6IFNvY2lhbFVzZXIgPSBudWxsO1xyXG4gIHByaXZhdGUgX3VzZXJfaW5zdGE6IFNvY2lhbFVzZXIgPSBudWxsO1xyXG4gIHByaXZhdGUgX2F1dGhTdGF0ZV9nb29nbGU6IFJlcGxheVN1YmplY3Q8U29jaWFsVXNlcj4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcclxuICBwcml2YXRlIF9hdXRoU3RhdGVfZmI6IFJlcGxheVN1YmplY3Q8U29jaWFsVXNlcj4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcclxuICBwcml2YXRlIF9hdXRoU3RhdGVfaW5zdGE6IFJlcGxheVN1YmplY3Q8U29jaWFsVXNlcj4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcclxuXHJcbiAgLyogQ29uc2lkZXIgbWFraW5nIHRoaXMgYW4gZW51bSBjb21wcmlzaW5nIExPQURJTkcsIExPQURFRCwgRkFJTEVEIGV0Yy4gKi9cclxuICBwcml2YXRlIGluaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfaW5pdFN0YXRlOiBBc3luY1N1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQXN5bmNTdWJqZWN0KCk7XHJcblxyXG4gIGdldCBhdXRoU3RhdGVfZ29vZ2xlKCk6IE9ic2VydmFibGU8U29jaWFsVXNlcj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2F1dGhTdGF0ZV9nb29nbGUuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgYXV0aFN0YXRlX2ZiKCk6IE9ic2VydmFibGU8U29jaWFsVXNlcj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2F1dGhTdGF0ZV9mYi5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIGdldCBhdXRoU3RhdGVfaW5zdGEoKTogT2JzZXJ2YWJsZTxTb2NpYWxVc2VyPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fYXV0aFN0YXRlX2luc3RhLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGluaXRTdGF0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLl9pbml0U3RhdGUuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoJ1NvY2lhbEF1dGhTZXJ2aWNlQ29uZmlnJylcclxuICAgIGNvbmZpZzogU29jaWFsQXV0aFNlcnZpY2VDb25maWcgfCBQcm9taXNlPFNvY2lhbEF1dGhTZXJ2aWNlQ29uZmlnPlxyXG4gICkge1xyXG4gICAgaWYgKGNvbmZpZyBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgY29uZmlnLnRoZW4oKGNvbmZpZykgPT4ge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZShjb25maWcpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShjb25maWcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplKGNvbmZpZzogU29jaWFsQXV0aFNlcnZpY2VDb25maWcpIHtcclxuICAgIHRoaXMuYXV0b0xvZ2luID0gY29uZmlnLmF1dG9Mb2dpbiAhPT0gdW5kZWZpbmVkID8gY29uZmlnLmF1dG9Mb2dpbiA6IGZhbHNlO1xyXG4gICAgY29uc3QgeyBvbkVycm9yID0gY29uc29sZS5lcnJvciB9ID0gY29uZmlnO1xyXG5cclxuICAgIGNvbmZpZy5wcm92aWRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICB0aGlzLnByb3ZpZGVycy5zZXQoaXRlbS5pZCwgaXRlbS5wcm92aWRlcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBQcm9taXNlLmFsbChcclxuICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb3ZpZGVycy52YWx1ZXMoKSkubWFwKChwcm92aWRlcikgPT5cclxuICAgICAgICBwcm92aWRlci5pbml0aWFsaXplKClcclxuICAgICAgKVxyXG4gICAgKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b0xvZ2luKSB7XHJcbiAgICAgICAgICBjb25zdCBsb2dpblN0YXR1c1Byb21pc2VzID0gW107XHJcbiAgICAgICAgICBsZXQgbG9nZ2VkSW5fZ29vZ2xlID0gZmFsc2U7XHJcbiAgICAgICAgICBsZXQgbG9nZ2VkSW5fZmIgPSBmYWxzZTtcclxuICAgICAgICAgIGxldCBsb2dnZWRJbl9pbnN0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5wcm92aWRlcnMuZm9yRWFjaCgocHJvdmlkZXI6IExvZ2luUHJvdmlkZXIsIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXNlID0gcHJvdmlkZXIuZ2V0TG9naW5TdGF0dXMoKTtcclxuICAgICAgICAgICAgbG9naW5TdGF0dXNQcm9taXNlcy5wdXNoKHByb21pc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlXHJcbiAgICAgICAgICAgICAgLnRoZW4oKHVzZXI6IFNvY2lhbFVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHVzZXIucHJvdmlkZXIgPSBrZXk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoa2V5ID09PSBHb29nbGVMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJfZ29vZ2xlID0gdXNlcjtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlX2dvb2dsZS5uZXh0KHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICBsb2dnZWRJbl9nb29nbGUgPSB0cnVlOyAgLy90b2RvXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXkgPT09IEZhY2Vib29rTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5fdXNlcl9mYiA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZV9mYi5uZXh0KHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICBsb2dnZWRJbl9mYiA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5fdXNlcl9pbnN0YSA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZV9pbnN0YS5uZXh0KHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICBsb2dnZWRJbl9pbnN0YSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLmNhdGNoKGNvbnNvbGUuZGVidWcpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBQcm9taXNlLmFsbChsb2dpblN0YXR1c1Byb21pc2VzKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghbG9nZ2VkSW5fZmIpIHtcclxuICAgICAgICAgICAgICB0aGlzLl91c2VyX2ZiID0gbnVsbDsgIC8vdG9kb1xyXG4gICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZV9mYi5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghbG9nZ2VkSW5fZ29vZ2xlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fdXNlcl9nb29nbGUgPSBudWxsOyAgLy90b2RvXHJcbiAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlX2dvb2dsZS5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghbG9nZ2VkSW5faW5zdGEpIHtcclxuICAgICAgICAgICAgICB0aGlzLl91c2VyX2luc3RhID0gbnVsbDsgIC8vdG9kb1xyXG4gICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZV9pbnN0YS5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICBvbkVycm9yKGVycm9yKTtcclxuICAgICAgfSlcclxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2luaXRTdGF0ZS5uZXh0KHRoaXMuaW5pdGlhbGl6ZWQpO1xyXG4gICAgICAgIHRoaXMuX2luaXRTdGF0ZS5jb21wbGV0ZSgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hBdXRoVG9rZW4ocHJvdmlkZXJJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX05PVF9JTklUSUFMSVpFRCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocHJvdmlkZXJJZCAhPT0gR29vZ2xlTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRCkge1xyXG4gICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTk9UX1NVUFBPUlRFRF9GT1JfUkVGUkVTSF9UT0tFTik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgcHJvdmlkZXJPYmplY3QgPSB0aGlzLnByb3ZpZGVycy5nZXQocHJvdmlkZXJJZCk7XHJcbiAgICAgICAgaWYgKHByb3ZpZGVyT2JqZWN0KSB7XHJcbiAgICAgICAgICBwcm92aWRlck9iamVjdFxyXG4gICAgICAgICAgICAuZ2V0TG9naW5TdGF0dXMoe3JlZnJlc2hUb2tlbjogdHJ1ZX0pXHJcbiAgICAgICAgICAgIC50aGVuKCh1c2VyOiBTb2NpYWxVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgdXNlci5wcm92aWRlciA9IHByb3ZpZGVySWQ7XHJcbiAgICAgICAgICAgICAgaWYocHJvdmlkZXJJZCA9PT0gR29vZ2xlTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlcl9nb29nbGUgPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlX2dvb2dsZS5uZXh0KHVzZXIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlbHNlIGlmIChwcm92aWRlcklkID09PSBGYWNlYm9va0xvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQpXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlcl9mYiA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRoU3RhdGVfZmIubmV4dCh1c2VyKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyX2luc3RhID0gdXNlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZV9pbnN0YS5uZXh0KHVzZXIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX0xPR0lOX1BST1ZJREVSX05PVF9GT1VORCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNpZ25Jbihwcm92aWRlcklkOiBzdHJpbmcsIHNpZ25Jbk9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPFNvY2lhbFVzZXI+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTk9UX0lOSVRJQUxJWkVEKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgcHJvdmlkZXJPYmplY3QgPSB0aGlzLnByb3ZpZGVycy5nZXQocHJvdmlkZXJJZCk7XHJcbiAgICAgICAgaWYgKHByb3ZpZGVyT2JqZWN0KSB7XHJcbiAgICAgICAgICBwcm92aWRlck9iamVjdFxyXG4gICAgICAgICAgICAuc2lnbkluKHNpZ25Jbk9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50aGVuKCh1c2VyOiBTb2NpYWxVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgdXNlci5wcm92aWRlciA9IHByb3ZpZGVySWQ7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYocHJvdmlkZXJJZCA9PT0gR29vZ2xlTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlcl9nb29nbGUgPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlX2dvb2dsZS5uZXh0KHVzZXIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlbHNlIGlmIChwcm92aWRlcklkID09PSBGYWNlYm9va0xvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQpXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlcl9mYiA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRoU3RhdGVfZmIubmV4dCh1c2VyKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyX2luc3RhID0gdXNlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZV9pbnN0YS5uZXh0KHVzZXIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTE9HSU5fUFJPVklERVJfTk9UX0ZPVU5EKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2lnbk91dChwcm92aWRlcklkOiBzdHJpbmcsIHJldm9rZTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zb2xlLmxvZyhwcm92aWRlcklkKTtcclxuICAgIGlmKHByb3ZpZGVySWQgPT09IEdvb2dsZUxvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTk9UX0lOSVRJQUxJWkVEKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl91c2VyX2dvb2dsZSkge1xyXG4gICAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9OT1RfTE9HR0VEX0lOKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGV0IHByb3ZpZGVySWQgPSB0aGlzLl91c2VyX2dvb2dsZS5wcm92aWRlcjtcclxuICAgICAgICAgIGxldCBwcm92aWRlck9iamVjdCA9IHRoaXMucHJvdmlkZXJzLmdldChwcm92aWRlcklkKTtcclxuICAgICAgICAgIGlmIChwcm92aWRlck9iamVjdCkge1xyXG4gICAgICAgICAgICBwcm92aWRlck9iamVjdFxyXG4gICAgICAgICAgICAgIC5zaWduT3V0KHJldm9rZSlcclxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyX2dvb2dsZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRoU3RhdGVfZ29vZ2xlLm5leHQobnVsbCk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX0xPR0lOX1BST1ZJREVSX05PVF9GT1VORCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYocHJvdmlkZXJJZCA9PT0gRmFjZWJvb2tMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEKSB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX05PVF9JTklUSUFMSVpFRCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fdXNlcl9mYikge1xyXG4gICAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9OT1RfTE9HR0VEX0lOKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGV0IHByb3ZpZGVySWQgPSB0aGlzLl91c2VyX2ZiLnByb3ZpZGVyO1xyXG4gICAgICAgICAgbGV0IHByb3ZpZGVyT2JqZWN0ID0gdGhpcy5wcm92aWRlcnMuZ2V0KHByb3ZpZGVySWQpO1xyXG4gICAgICAgICAgaWYgKHByb3ZpZGVyT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyT2JqZWN0XHJcbiAgICAgICAgICAgICAgLnNpZ25PdXQocmV2b2tlKVxyXG4gICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJfZmIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlX2ZiLm5leHQobnVsbCk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX0xPR0lOX1BST1ZJREVSX05PVF9GT1VORCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9OT1RfSU5JVElBTElaRUQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX3VzZXJfaW5zdGEpIHtcclxuICAgICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTk9UX0xPR0dFRF9JTik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxldCBwcm92aWRlcklkID0gdGhpcy5fdXNlcl9pbnN0YS5wcm92aWRlcjtcclxuICAgICAgICAgIGxldCBwcm92aWRlck9iamVjdCA9IHRoaXMucHJvdmlkZXJzLmdldChwcm92aWRlcklkKTtcclxuICAgICAgICAgIGlmIChwcm92aWRlck9iamVjdCkge1xyXG4gICAgICAgICAgICBwcm92aWRlck9iamVjdFxyXG4gICAgICAgICAgICAgIC5zaWduT3V0KHJldm9rZSlcclxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyX2luc3RhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZV9pbnN0YS5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==