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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1NvdXJjZXMvd29ya3NwYWNlcy9pbmZpbm92YWUtZGFzaGJvYXJkL3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJzb2NpYWxhdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBUXhFLGVBQWU7QUFFZixNQUFNLE9BQU8saUJBQWlCO0lBdUM1QixZQUVFLE1BQWtFO1FBaEM1RCxjQUFTLEdBQStCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDbEQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixpQkFBWSxHQUFlLElBQUksQ0FBQztRQUNoQyxhQUFRLEdBQWUsSUFBSSxDQUFDO1FBQzVCLGdCQUFXLEdBQWUsSUFBSSxDQUFDO1FBQy9CLHNCQUFpQixHQUE4QixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxrQkFBYSxHQUE4QixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxxQkFBZ0IsR0FBOEIsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0UsMEVBQTBFO1FBQ2xFLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGVBQVUsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXNCN0QsSUFBSSxNQUFNLFlBQVksT0FBTyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxN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UnVCLDhDQUE0QixHQUNsRCwwQkFBMEIsQ0FBQztBQUNMLG1DQUFpQixHQUFHLGVBQWUsQ0FBQztBQUNwQyxxQ0FBbUIsR0FDekMsa0VBQWtFLENBQUM7QUFDN0MscURBQW1DLEdBQ3pELCtEQUErRCxDQUFDO2tGQVB2RCxpQkFBaUIsY0F3Q2xCLHlCQUF5Qjt5REF4Q3hCLGlCQUFpQixXQUFqQixpQkFBaUI7a0RBQWpCLGlCQUFpQjtjQUQ3QixVQUFVOztzQkF5Q04sTUFBTTt1QkFBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFzeW5jU3ViamVjdCwgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTG9naW5Qcm92aWRlciB9IGZyb20gJy4vZW50aXRpZXMvbG9naW4tcHJvdmlkZXInO1xuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4vZW50aXRpZXMvc29jaWFsLXVzZXInO1xuaW1wb3J0IHsgRmFjZWJvb2tMb2dpblByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZmFjZWJvb2stbG9naW4tcHJvdmlkZXInO1xuaW1wb3J0IHsgR29vZ2xlTG9naW5Qcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2dvb2dsZS1sb2dpbi1wcm92aWRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29jaWFsQXV0aFNlcnZpY2VDb25maWcge1xuICBhdXRvTG9naW4/OiBib29sZWFuO1xuICBwcm92aWRlcnM6IHsgaWQ6IHN0cmluZzsgcHJvdmlkZXI6IExvZ2luUHJvdmlkZXIgfVtdO1xuICBvbkVycm9yPzogKGVycm9yOiBhbnkpID0+IGFueTtcbn1cblxuLyoqIEBkeW5hbWljICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU29jaWFsQXV0aFNlcnZpY2Uge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBFUlJfTE9HSU5fUFJPVklERVJfTk9UX0ZPVU5EID1cbiAgICAnTG9naW4gcHJvdmlkZXIgbm90IGZvdW5kJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRVJSX05PVF9MT0dHRURfSU4gPSAnTm90IGxvZ2dlZCBpbic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVSUl9OT1RfSU5JVElBTElaRUQgPVxuICAgICdMb2dpbiBwcm92aWRlcnMgbm90IHJlYWR5IHlldC4gQXJlIHRoZXJlIGVycm9ycyBvbiB5b3VyIGNvbnNvbGU/JztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRVJSX05PVF9TVVBQT1JURURfRk9SX1JFRlJFU0hfVE9LRU4gPVxuICAgICdDaG9zZW4gbG9naW4gcHJvdmlkZXIgaXMgbm90IHN1cHBvcnRlZCBmb3IgcmVmcmVzaGluZyBhIHRva2VuJztcblxuICBwcml2YXRlIHByb3ZpZGVyczogTWFwPHN0cmluZywgTG9naW5Qcm92aWRlcj4gPSBuZXcgTWFwKCk7XG4gIHByaXZhdGUgYXV0b0xvZ2luID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfdXNlcl9nb29nbGU6IFNvY2lhbFVzZXIgPSBudWxsO1xuICBwcml2YXRlIF91c2VyX2ZiOiBTb2NpYWxVc2VyID0gbnVsbDtcbiAgcHJpdmF0ZSBfdXNlcl9pbnN0YTogU29jaWFsVXNlciA9IG51bGw7XG4gIHByaXZhdGUgX2F1dGhTdGF0ZV9nb29nbGU6IFJlcGxheVN1YmplY3Q8U29jaWFsVXNlcj4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcbiAgcHJpdmF0ZSBfYXV0aFN0YXRlX2ZiOiBSZXBsYXlTdWJqZWN0PFNvY2lhbFVzZXI+ID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XG4gIHByaXZhdGUgX2F1dGhTdGF0ZV9pbnN0YTogUmVwbGF5U3ViamVjdDxTb2NpYWxVc2VyPiA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xuXG4gIC8qIENvbnNpZGVyIG1ha2luZyB0aGlzIGFuIGVudW0gY29tcHJpc2luZyBMT0FESU5HLCBMT0FERUQsIEZBSUxFRCBldGMuICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaW5pdFN0YXRlOiBBc3luY1N1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQXN5bmNTdWJqZWN0KCk7XG5cbiAgZ2V0IGF1dGhTdGF0ZV9nb29nbGUoKTogT2JzZXJ2YWJsZTxTb2NpYWxVc2VyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F1dGhTdGF0ZV9nb29nbGUuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgYXV0aFN0YXRlX2ZiKCk6IE9ic2VydmFibGU8U29jaWFsVXNlcj4ge1xuICAgIHJldHVybiB0aGlzLl9hdXRoU3RhdGVfZmIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgYXV0aFN0YXRlX2luc3RhKCk6IE9ic2VydmFibGU8U29jaWFsVXNlcj4ge1xuICAgIHJldHVybiB0aGlzLl9hdXRoU3RhdGVfaW5zdGEuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgaW5pdFN0YXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9pbml0U3RhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdTb2NpYWxBdXRoU2VydmljZUNvbmZpZycpXG4gICAgY29uZmlnOiBTb2NpYWxBdXRoU2VydmljZUNvbmZpZyB8IFByb21pc2U8U29jaWFsQXV0aFNlcnZpY2VDb25maWc+XG4gICkge1xuICAgIGlmIChjb25maWcgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICBjb25maWcudGhlbigoY29uZmlnKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZShjb25maWcpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShjb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZShjb25maWc6IFNvY2lhbEF1dGhTZXJ2aWNlQ29uZmlnKSB7XG4gICAgdGhpcy5hdXRvTG9naW4gPSBjb25maWcuYXV0b0xvZ2luICE9PSB1bmRlZmluZWQgPyBjb25maWcuYXV0b0xvZ2luIDogZmFsc2U7XG4gICAgY29uc3QgeyBvbkVycm9yID0gY29uc29sZS5lcnJvciB9ID0gY29uZmlnO1xuXG4gICAgY29uZmlnLnByb3ZpZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5zZXQoaXRlbS5pZCwgaXRlbS5wcm92aWRlcik7XG4gICAgfSk7XG5cbiAgICBQcm9taXNlLmFsbChcbiAgICAgIEFycmF5LmZyb20odGhpcy5wcm92aWRlcnMudmFsdWVzKCkpLm1hcCgocHJvdmlkZXIpID0+XG4gICAgICAgIHByb3ZpZGVyLmluaXRpYWxpemUoKVxuICAgICAgKVxuICAgIClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b0xvZ2luKSB7XG4gICAgICAgICAgY29uc3QgbG9naW5TdGF0dXNQcm9taXNlcyA9IFtdO1xuICAgICAgICAgIGxldCBsb2dnZWRJbl9nb29nbGUgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgbG9nZ2VkSW5fZmIgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgbG9nZ2VkSW5faW5zdGEgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnByb3ZpZGVycy5mb3JFYWNoKChwcm92aWRlcjogTG9naW5Qcm92aWRlciwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9taXNlID0gcHJvdmlkZXIuZ2V0TG9naW5TdGF0dXMoKTtcbiAgICAgICAgICAgIGxvZ2luU3RhdHVzUHJvbWlzZXMucHVzaChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2VcbiAgICAgICAgICAgICAgLnRoZW4oKHVzZXI6IFNvY2lhbFVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICB1c2VyLnByb3ZpZGVyID0ga2V5O1xuXG4gICAgICAgICAgICAgICAgaWYoa2V5ID09PSBHb29nbGVMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLl91c2VyX2dvb2dsZSA9IHVzZXI7XG4gICAgICAgICAgICAgICAgICB0aGlzLl9hdXRoU3RhdGVfZ29vZ2xlLm5leHQodXNlcik7XG4gICAgICAgICAgICAgICAgICBsb2dnZWRJbl9nb29nbGUgPSB0cnVlOyAgLy90b2RvXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PT0gRmFjZWJvb2tMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJfZmIgPSB1c2VyO1xuICAgICAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlX2ZiLm5leHQodXNlcik7XG4gICAgICAgICAgICAgICAgICBsb2dnZWRJbl9mYiA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJfaW5zdGEgPSB1c2VyO1xuICAgICAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlX2luc3RhLm5leHQodXNlcik7XG4gICAgICAgICAgICAgICAgICBsb2dnZWRJbl9pbnN0YSA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChjb25zb2xlLmRlYnVnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBQcm9taXNlLmFsbChsb2dpblN0YXR1c1Byb21pc2VzKS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWxvZ2dlZEluX2ZiKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3VzZXJfZmIgPSBudWxsOyAgLy90b2RvXG4gICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZV9mYi5uZXh0KG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFsb2dnZWRJbl9nb29nbGUpIHtcbiAgICAgICAgICAgICAgdGhpcy5fdXNlcl9nb29nbGUgPSBudWxsOyAgLy90b2RvXG4gICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZV9nb29nbGUubmV4dChudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbG9nZ2VkSW5faW5zdGEpIHtcbiAgICAgICAgICAgICAgdGhpcy5fdXNlcl9pbnN0YSA9IG51bGw7ICAvL3RvZG9cbiAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlX2luc3RhLm5leHQobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIG9uRXJyb3IoZXJyb3IpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2luaXRTdGF0ZS5uZXh0KHRoaXMuaW5pdGlhbGl6ZWQpO1xuICAgICAgICB0aGlzLl9pbml0U3RhdGUuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVmcmVzaEF1dGhUb2tlbihwcm92aWRlcklkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTk9UX0lOSVRJQUxJWkVEKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvdmlkZXJJZCAhPT0gR29vZ2xlTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRCkge1xuICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX05PVF9TVVBQT1JURURfRk9SX1JFRlJFU0hfVE9LRU4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJPYmplY3QgPSB0aGlzLnByb3ZpZGVycy5nZXQocHJvdmlkZXJJZCk7XG4gICAgICAgIGlmIChwcm92aWRlck9iamVjdCkge1xuICAgICAgICAgIHByb3ZpZGVyT2JqZWN0XG4gICAgICAgICAgICAuZ2V0TG9naW5TdGF0dXMoe3JlZnJlc2hUb2tlbjogdHJ1ZX0pXG4gICAgICAgICAgICAudGhlbigodXNlcjogU29jaWFsVXNlcikgPT4ge1xuICAgICAgICAgICAgICB1c2VyLnByb3ZpZGVyID0gcHJvdmlkZXJJZDtcbiAgICAgICAgICAgICAgaWYocHJvdmlkZXJJZCA9PT0gR29vZ2xlTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJfZ29vZ2xlID0gdXNlcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRoU3RhdGVfZ29vZ2xlLm5leHQodXNlcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSBpZiAocHJvdmlkZXJJZCA9PT0gRmFjZWJvb2tMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEKVxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlcl9mYiA9IHVzZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlX2ZiLm5leHQodXNlcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlcl9pbnN0YSA9IHVzZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlX2luc3RhLm5leHQodXNlcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzaWduSW4ocHJvdmlkZXJJZDogc3RyaW5nLCBzaWduSW5PcHRpb25zPzogYW55KTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX05PVF9JTklUSUFMSVpFRCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJvdmlkZXJPYmplY3QgPSB0aGlzLnByb3ZpZGVycy5nZXQocHJvdmlkZXJJZCk7XG4gICAgICAgIGlmIChwcm92aWRlck9iamVjdCkge1xuICAgICAgICAgIHByb3ZpZGVyT2JqZWN0XG4gICAgICAgICAgICAuc2lnbkluKHNpZ25Jbk9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbigodXNlcjogU29jaWFsVXNlcikgPT4ge1xuICAgICAgICAgICAgICB1c2VyLnByb3ZpZGVyID0gcHJvdmlkZXJJZDtcbiAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcblxuICAgICAgICAgICAgICBpZihwcm92aWRlcklkID09PSBHb29nbGVMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlcl9nb29nbGUgPSB1c2VyO1xuICAgICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZV9nb29nbGUubmV4dCh1c2VyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChwcm92aWRlcklkID09PSBGYWNlYm9va0xvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQpXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyX2ZiID0gdXNlcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRoU3RhdGVfZmIubmV4dCh1c2VyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyX2luc3RhID0gdXNlcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRoU3RhdGVfaW5zdGEubmV4dCh1c2VyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzaWduT3V0KHByb3ZpZGVySWQ6IHN0cmluZywgcmV2b2tlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZyhwcm92aWRlcklkKTtcbiAgICBpZihwcm92aWRlcklkID09PSBHb29nbGVMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX05PVF9JTklUSUFMSVpFRCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX3VzZXJfZ29vZ2xlKSB7XG4gICAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9OT1RfTE9HR0VEX0lOKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgcHJvdmlkZXJJZCA9IHRoaXMuX3VzZXJfZ29vZ2xlLnByb3ZpZGVyO1xuICAgICAgICAgIGxldCBwcm92aWRlck9iamVjdCA9IHRoaXMucHJvdmlkZXJzLmdldChwcm92aWRlcklkKTtcbiAgICAgICAgICBpZiAocHJvdmlkZXJPYmplY3QpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyT2JqZWN0XG4gICAgICAgICAgICAgIC5zaWduT3V0KHJldm9rZSlcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgXG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlcl9nb29nbGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZV9nb29nbGUubmV4dChudWxsKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTE9HSU5fUFJPVklERVJfTk9UX0ZPVU5EKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmKHByb3ZpZGVySWQgPT09IEZhY2Vib29rTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9OT1RfSU5JVElBTElaRUQpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl91c2VyX2ZiKSB7XG4gICAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9OT1RfTE9HR0VEX0lOKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgcHJvdmlkZXJJZCA9IHRoaXMuX3VzZXJfZmIucHJvdmlkZXI7XG4gICAgICAgICAgbGV0IHByb3ZpZGVyT2JqZWN0ID0gdGhpcy5wcm92aWRlcnMuZ2V0KHByb3ZpZGVySWQpO1xuICAgICAgICAgIGlmIChwcm92aWRlck9iamVjdCkge1xuICAgICAgICAgICAgcHJvdmlkZXJPYmplY3RcbiAgICAgICAgICAgICAgLnNpZ25PdXQocmV2b2tlKVxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICBcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyX2ZiID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRoU3RhdGVfZmIubmV4dChudWxsKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTE9HSU5fUFJPVklERVJfTk9UX0ZPVU5EKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTk9UX0lOSVRJQUxJWkVEKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fdXNlcl9pbnN0YSkge1xuICAgICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTk9UX0xPR0dFRF9JTik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IHByb3ZpZGVySWQgPSB0aGlzLl91c2VyX2luc3RhLnByb3ZpZGVyO1xuICAgICAgICAgIGxldCBwcm92aWRlck9iamVjdCA9IHRoaXMucHJvdmlkZXJzLmdldChwcm92aWRlcklkKTtcbiAgICAgICAgICBpZiAocHJvdmlkZXJPYmplY3QpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyT2JqZWN0XG4gICAgICAgICAgICAgIC5zaWduT3V0KHJldm9rZSlcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgXG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlcl9pbnN0YSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlX2luc3RhLm5leHQobnVsbCk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX0xPR0lOX1BST1ZJREVSX05PVF9GT1VORCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==