import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule, Optional, SkipSelf } from '@angular/core';
import { ReplaySubject, AsyncSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { __awaiter } from 'tslib';

class BaseLoginProvider {
    constructor() { }
    loadScript(id, src, onload, parentElement = null) {
        // get document if platform is only browser
        if (typeof document !== 'undefined' && !document.getElementById(id)) {
            let signInJS = document.createElement('script');
            signInJS.async = true;
            signInJS.src = src;
            signInJS.onload = onload;
            if (!parentElement) {
                parentElement = document.head;
            }
            parentElement.appendChild(signInJS);
        }
    }
}

class SocialUser {
}

class FacebookLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions = {
        // scope: 'email,public_profile,user_friends,user_posts',
        scope: 'email,public_profile,user_friends,user_posts',
        locale: 'en_US',
        fields: 'name,email,picture,first_name,last_name,friends{summary{total_count}},posts{full_picture,created_time, comments, reactions}',
        version: 'v4.0',
    }) {
        super();
        this.clientId = clientId;
        this.initOptions = initOptions;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            try {
                this.loadScript(FacebookLoginProvider.PROVIDER_ID, `//connect.facebook.net/${this.initOptions.locale}/sdk.js`, () => {
                    FB.init({
                        appId: this.clientId,
                        autoLogAppEvents: true,
                        cookie: true,
                        xfbml: true,
                        version: this.initOptions.version,
                    });
                    resolve();
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            FB.getLoginStatus((response) => {
                if (response.status === 'connected') {
                    let user = new SocialUser();
                    let authResponse = response.authResponse;
                    user.authToken = authResponse.accessToken;
                    FB.api(`/me?fields=${this.initOptions.fields}`, (fbUser) => {
                        let user = new SocialUser();
                        user.id = fbUser.id;
                        user.name = fbUser.name;
                        user.email = fbUser.email;
                        user.photoUrl = fbUser.picture.data.url;
                        // 'https://graph.facebook.com/' +
                        // fbUser.id +
                        // '/picture?type=normal';
                        user.firstName = fbUser.first_name;
                        user.lastName = fbUser.last_name;
                        user.response = fbUser;
                    });
                    resolve(user);
                }
                else {
                    reject(`No user is currently logged in with ${FacebookLoginProvider.PROVIDER_ID}`);
                }
            });
        });
    }
    signIn(signInOptions) {
        const options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
        return new Promise((resolve, reject) => {
            FB.login((response) => {
                if (response.authResponse) {
                    let user = new SocialUser();
                    let authResponse = response.authResponse;
                    user.authToken = authResponse.accessToken;
                    // resolve(user);
                    console.log('access_token = ', user.authToken);
                    FB.api(`/me?fields=${options.fields}`, (fbUser) => {
                        // FB.api(`/me/permissions=${options.fields}`, (fbUser: any) => {
                        user.id = fbUser.id;
                        user.name = fbUser.name;
                        user.email = fbUser.email;
                        user.photoUrl = fbUser.picture.data.url;
                        // 'https://graph.facebook.com/' +
                        // fbUser.id +
                        // '/picture?type=normal';
                        user.firstName = fbUser.first_name;
                        user.lastName = fbUser.last_name;
                        // user.authToken = authResponse.accessToken;
                        user.response = fbUser;
                    });
                    resolve(user);
                }
                else {
                    reject('User cancelled login or did not fully authorize.');
                }
            }, options);
        });
    }
    signOut() {
        return new Promise((resolve, reject) => {
            FB.logout((response) => {
                resolve();
            });
        });
    }
}
FacebookLoginProvider.PROVIDER_ID = 'FACEBOOK';

class GoogleLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions = { scope: 'email' }) {
        super();
        this.clientId = clientId;
        this.initOptions = initOptions;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            try {
                this.loadScript(GoogleLoginProvider.PROVIDER_ID, 'https://apis.google.com/js/platform.js', () => {
                    gapi.load('auth2', () => {
                        this.auth2 = gapi.auth2.init(Object.assign(Object.assign({}, this.initOptions), { client_id: this.clientId }));
                        this.auth2
                            .then(() => {
                            resolve();
                        })
                            .catch((err) => {
                            reject(err);
                        });
                    });
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getLoginStatus(loginStatusOptions) {
        const options = Object.assign(Object.assign({}, this.initOptions), loginStatusOptions);
        return new Promise((resolve, reject) => {
            if (this.auth2.isSignedIn.get()) {
                let user = new SocialUser();
                const profile = this.auth2.currentUser.get().getBasicProfile();
                user.id = profile.getId();
                user.name = profile.getName();
                user.email = profile.getEmail();
                user.photoUrl = profile.getImageUrl();
                user.firstName = profile.getGivenName();
                user.lastName = profile.getFamilyName();
                user.response = profile;
                const resolveUser = authResponse => {
                    user.authToken = authResponse.access_token;
                    user.idToken = authResponse.id_token;
                    resolve(user);
                };
                if (options.refreshToken) {
                    this.auth2.currentUser.get().reloadAuthResponse().then(resolveUser);
                }
                else {
                    const authResponse = this.auth2.currentUser.get().getAuthResponse(true);
                    resolveUser(authResponse);
                }
            }
            else {
                reject(`No user is currently logged in with ${GoogleLoginProvider.PROVIDER_ID}`);
            }
        });
    }
    signIn(signInOptions) {
        const options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
        return new Promise((resolve, reject) => {
            const offlineAccess = options && options.offline_access;
            let promise = !offlineAccess
                ? this.auth2.signIn(signInOptions)
                : this.auth2.grantOfflineAccess(signInOptions);
            promise
                .then((response) => {
                let user = new SocialUser();
                if (response && response.code) {
                    user.authorizationCode = response.code;
                }
                else {
                    let profile = this.auth2.currentUser.get().getBasicProfile();
                    let token = this.auth2.currentUser.get().getAuthResponse(true)
                        .access_token;
                    let backendToken = this.auth2.currentUser
                        .get()
                        .getAuthResponse(true).id_token;
                    user.id = profile.getId();
                    user.name = profile.getName();
                    user.email = profile.getEmail();
                    user.photoUrl = profile.getImageUrl();
                    user.firstName = profile.getGivenName();
                    user.lastName = profile.getFamilyName();
                    user.authToken = token;
                    user.idToken = backendToken;
                    user.response = profile;
                }
                resolve(user);
            }, (closed) => {
                reject(closed);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    signOut(revoke) {
        return new Promise((resolve, reject) => {
            let signOutPromise;
            if (revoke) {
                signOutPromise = this.auth2.disconnect();
            }
            else {
                signOutPromise = this.auth2.signOut();
            }
            signOutPromise
                .then((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
}
GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';

/** @dynamic */
class SocialAuthService {
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
SocialAuthService.ɵfac = function SocialAuthService_Factory(t) { return new (t || SocialAuthService)(ɵɵinject('SocialAuthServiceConfig')); };
SocialAuthService.ɵprov = ɵɵdefineInjectable({ token: SocialAuthService, factory: SocialAuthService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SocialAuthService, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: ['SocialAuthServiceConfig']
            }] }]; }, null); })();

class SocialLoginModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('SocialLoginModule is already loaded. Import it in the AppModule only');
        }
    }
    static initialize(config) {
        return {
            ngModule: SocialLoginModule,
            providers: [
                SocialAuthService,
                {
                    provide: 'SocialAuthServiceConfig',
                    useValue: config
                }
            ]
        };
    }
}
SocialLoginModule.ɵmod = ɵɵdefineNgModule({ type: SocialLoginModule });
SocialLoginModule.ɵinj = ɵɵdefineInjector({ factory: function SocialLoginModule_Factory(t) { return new (t || SocialLoginModule)(ɵɵinject(SocialLoginModule, 12)); }, providers: [
        SocialAuthService
    ], imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(SocialLoginModule, { imports: [CommonModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(SocialLoginModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule
                ],
                providers: [
                    SocialAuthService
                ]
            }]
    }], function () { return [{ type: SocialLoginModule, decorators: [{
                type: Optional
            }, {
                type: SkipSelf
            }] }]; }, null); })();

// Simulates login / logout without actually requiring an Internet connection.
//
// Useful for certain development situations.
//
// For example, if you want to simulate the greatest football referee England has ever produced:
//
//  const dummyUser: SocialUser = {
//     id: '0123456789',
//     name: 'Howard Webb',
//     email: 'howard@webb.com',
//     firstName: 'Howard',
//     lastName: 'Webb',
//     authToken: 'dummyAuthToken',
//     photoUrl: 'https://en.wikipedia.org/wiki/Howard_Webb#/media/File:Howard_Webb_march11.jpg',
//     provider: 'DUMMY',
//     idToken: 'dummyIdToken',
//     authorizationCode: 'dummyAuthCode'
// };
//
//  let config = new AuthServiceConfig([
//  { ... },
//  {
//       id: DummyLoginProvider.PROVIDER_ID,
//       provider: new DummyLoginProvider(dummyUser)  // Pass your user into the constructor
//   },
//  { ... }
//  ]);
class DummyLoginProvider extends BaseLoginProvider {
    constructor(dummy) {
        super();
        if (dummy) {
            this.dummy = dummy;
        }
        else {
            this.dummy = DummyLoginProvider.DEFAULT_USER;
        }
        // Start not logged in
        this.loggedIn = false;
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            if (this.loggedIn) {
                resolve(this.dummy);
            }
            else {
                reject('No user is currently logged in.');
            }
        });
    }
    initialize() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    signIn() {
        return new Promise((resolve, reject) => {
            this.loggedIn = true;
            resolve(this.dummy);
        });
    }
    signOut(revoke) {
        return new Promise((resolve, reject) => {
            this.loggedIn = false;
            resolve();
        });
    }
}
DummyLoginProvider.PROVIDER_ID = 'DUMMY';
DummyLoginProvider.DEFAULT_USER = {
    id: '1234567890',
    name: 'Mickey Mouse',
    email: 'mickey@mouse.com',
    firstName: 'Mickey',
    lastName: 'Mouse',
    authToken: 'dummyAuthToken',
    photoUrl: 'https://en.wikipedia.org/wiki/File:Mickey_Mouse.png',
    provider: 'DUMMY',
    idToken: 'dummyIdToken',
    authorizationCode: 'dummyAuthCode',
    response: {}
};

class InstagramLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions = {
        scope: 'email,public_profile,read_insights,pages_show_list,instagram_basic,instagram_manage_insights,pages_read_engagement',
        locale: 'en_US',
        fields: 'id',
        version: 'v4.0',
    }, initInstaOptions = {
        feilds: 'username, profile_picture_url'
    }) {
        super();
        this.clientId = clientId;
        this.initOptions = initOptions;
        this.initInstaOptions = initInstaOptions;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            try {
                this.loadScript(InstagramLoginProvider.PROVIDER_ID, `//connect.facebook.net/${this.initOptions.locale}/sdk.js`, () => {
                    FB.init({
                        appId: this.clientId,
                        autoLogAppEvents: true,
                        cookie: true,
                        xfbml: true,
                        version: this.initOptions.version,
                    });
                    resolve();
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            FB.getLoginStatus((response) => {
                if (response.status === 'connected') {
                    let authResponse = response.authResponse;
                    let user = new SocialUser();
                    // user.response = fbUser;
                    user.authToken = authResponse.accessToken;
                    FB.api(`/me/accounts? fields=instagram_business_account{name, username, ig_id, profile_picture_url, followers_count, media_count, media{comments_count, like_count, timestamp, comments, media_url}}, name, link, picture`, (fbUser) => {
                        user.response = fbUser;
                        // user.authToken = authResponse;
                        if (fbUser.data.length !== 0) {
                            let i;
                            let flag = false;
                            for (i = 0; i < fbUser.data.length; i++) {
                                if (fbUser.data[i].instagram_business_account != null && fbUser.data[i].id != null) {
                                    flag = true;
                                    user.name = fbUser.data[i].instagram_business_account.username; // todo
                                    user.photoUrl = fbUser.data[i].instagram_business_account.profile_picture_url; //todo               
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
                }
                else {
                    reject(`No user is currently logged in with ${InstagramLoginProvider.PROVIDER_ID}`);
                }
            });
        });
    }
    signIn(signInOptions) {
        const options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
        return new Promise((resolve, reject) => {
            FB.login((response) => {
                if (response.authResponse) {
                    let authResponse = response.authResponse;
                    let user = new SocialUser();
                    user.authToken = authResponse.accessToken;
                    // resolve(user);
                    FB.api(`/me/accounts? fields=instagram_business_account{name, username, ig_id, profile_picture_url, followers_count, media_count, media{comments_count, like_count, timestamp, comments, media_url}}, name, link, picture`, (fbUser) => {
                        user.response = fbUser;
                        if (fbUser.data.length !== 0) {
                            let i;
                            let flag = false;
                            for (i = 0; i < fbUser.data.length; i++) {
                                if (fbUser.data[i].instagram_business_account != null && fbUser.data[i].id != null) {
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
                }
                else {
                    reject('User cancelled login or did not fully authorize.');
                }
            }, options);
        });
    }
    signOut() {
        return new Promise((resolve, reject) => {
            FB.logout((response) => {
                resolve();
            });
        });
    }
}
InstagramLoginProvider.PROVIDER_ID = 'INSTAGRAM';

class AmazonLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions = {
        scope: 'profile',
        scope_data: {
            profile: { essential: false },
        },
        redirect_uri: location.origin,
    }) {
        super();
        this.clientId = clientId;
        this.initOptions = initOptions;
    }
    initialize() {
        let amazonRoot = null;
        if (document) {
            amazonRoot = document.createElement('div');
            amazonRoot.id = 'amazon-root';
            document.body.appendChild(amazonRoot);
        }
        window.onAmazonLoginReady = () => {
            amazon.Login.setClientId(this.clientId);
        };
        return new Promise((resolve, reject) => {
            try {
                this.loadScript('amazon-login-sdk', 'https://assets.loginwithamazon.com/sdk/na/login1.js', () => {
                    resolve();
                }, amazonRoot);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            let token = this.retrieveToken();
            if (token) {
                amazon.Login.retrieveProfile(token, (response) => {
                    if (response.success) {
                        let user = new SocialUser();
                        user.id = response.profile.CustomerId;
                        user.name = response.profile.Name;
                        user.email = response.profile.PrimaryEmail;
                        user.response = response.profile;
                        resolve(user);
                    }
                    else {
                        reject(response.error);
                    }
                });
            }
            else {
                reject(`No user is currently logged in with ${AmazonLoginProvider.PROVIDER_ID}`);
            }
        });
    }
    signIn(signInOptions) {
        const options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
        return new Promise((resolve, reject) => {
            amazon.Login.authorize(options, (authResponse) => {
                if (authResponse.error) {
                    reject(authResponse.error);
                }
                else {
                    amazon.Login.retrieveProfile(authResponse.access_token, (response) => {
                        let user = new SocialUser();
                        user.id = response.profile.CustomerId;
                        user.name = response.profile.Name;
                        user.email = response.profile.PrimaryEmail;
                        user.authToken = authResponse.access_token;
                        user.response = response.profile;
                        this.persistToken(authResponse.access_token);
                        resolve(user);
                    });
                }
            });
        });
    }
    signOut(revoke) {
        return new Promise((resolve, reject) => {
            try {
                amazon.Login.logout();
                this.clearToken();
                resolve();
            }
            catch (err) {
                reject(err.message);
            }
        });
    }
    persistToken(token) {
        localStorage.setItem(`${AmazonLoginProvider.PROVIDER_ID}_token`, token);
    }
    retrieveToken() {
        return localStorage.getItem(`${AmazonLoginProvider.PROVIDER_ID}_token`);
    }
    clearToken() {
        localStorage.removeItem(`${AmazonLoginProvider.PROVIDER_ID}_token`);
    }
}
AmazonLoginProvider.PROVIDER_ID = 'AMAZON';

class VKLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions = {
        fields: 'photo_max,contacts',
        version: '5.124',
    }) {
        super();
        this.clientId = clientId;
        this.initOptions = initOptions;
        this.VK_API_URL = '//vk.com/js/api/openapi.js';
        this.VK_API_GET_USER = 'users.get';
    }
    initialize() {
        return new Promise((resolve, reject) => {
            try {
                this.loadScript(VKLoginProvider.PROVIDER_ID, this.VK_API_URL, () => {
                    VK.init({
                        apiId: this.clientId,
                    });
                    resolve();
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => this.getLoginStatusInternal(resolve, reject));
    }
    signIn() {
        return new Promise((resolve, reject) => this.signInInternal(resolve, reject));
    }
    signOut() {
        return new Promise((resolve, reject) => {
            VK.Auth.logout((response) => {
                resolve();
            });
        });
    }
    signInInternal(resolve, reject) {
        VK.Auth.login((loginResponse) => {
            if (loginResponse.status === 'connected') {
                this.getUser(loginResponse.session.mid, loginResponse.session.sid, resolve);
            }
        });
    }
    getUser(userId, token, resolve) {
        VK.Api.call(this.VK_API_GET_USER, {
            user_id: userId,
            fields: this.initOptions.fields,
            v: this.initOptions.version,
        }, (userResponse) => {
            resolve(this.createUser(Object.assign({}, { token }, userResponse.response[0])));
        });
    }
    getLoginStatusInternal(resolve, reject) {
        VK.Auth.getLoginStatus((loginResponse) => {
            if (loginResponse.status === 'connected') {
                this.getUser(loginResponse.session.mid, loginResponse.session.sid, resolve);
            }
        });
    }
    createUser(response) {
        const user = new SocialUser();
        user.id = response.id;
        user.name = `${response.first_name} ${response.last_name}`;
        user.photoUrl = response.photo_max;
        user.authToken = response.token;
        return user;
    }
}
VKLoginProvider.PROVIDER_ID = 'VK';

/**
 * Protocol modes supported by MSAL.
 */
var ProtocolMode;
(function (ProtocolMode) {
    ProtocolMode["AAD"] = "AAD";
    ProtocolMode["OIDC"] = "OIDC";
})(ProtocolMode || (ProtocolMode = {}));
const COMMON_AUTHORITY = 'https://login.microsoftonline.com/common/';
/**
 * Microsoft Authentication using MSAL v2: https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser
 */
class MicrosoftLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions) {
        super();
        this.clientId = clientId;
        this.initOptions = {
            authority: COMMON_AUTHORITY,
            scopes: ['openid', 'email', 'profile', 'User.Read'],
            knownAuthorities: [],
            protocolMode: ProtocolMode.AAD,
            clientCapabilities: [],
            cacheLocation: 'sessionStorage'
        };
        this.initOptions = Object.assign(Object.assign({}, this.initOptions), initOptions);
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.loadScript(MicrosoftLoginProvider.PROVIDER_ID, 'https://alcdn.msauth.net/browser/2.1.0/js/msal-browser.js', () => {
                var _a;
                try {
                    const config = {
                        auth: {
                            clientId: this.clientId,
                            redirectUri: (_a = this.initOptions.redirect_uri) !== null && _a !== void 0 ? _a : location.origin,
                            authority: this.initOptions.authority,
                            knownAuthorities: this.initOptions.knownAuthorities,
                            protocolMode: this.initOptions.protocolMode,
                            clientCapabilities: this.initOptions.clientCapabilities
                        },
                        cache: !this.initOptions.cacheLocation ? null : {
                            cacheLocation: this.initOptions.cacheLocation
                        }
                    };
                    this._instance = new msal.PublicClientApplication(config);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    getSocialUser(loginResponse) {
        return new Promise((resolve, reject) => {
            //After login, use Microsoft Graph API to get user info
            let meRequest = new XMLHttpRequest();
            meRequest.onreadystatechange = () => {
                if (meRequest.readyState == 4) {
                    try {
                        if (meRequest.status == 200) {
                            let userInfo = JSON.parse(meRequest.responseText);
                            let user = new SocialUser();
                            user.provider = MicrosoftLoginProvider.PROVIDER_ID;
                            user.id = loginResponse.idToken;
                            user.authToken = loginResponse.accessToken;
                            user.name = loginResponse.idTokenClaims.name;
                            user.email = loginResponse.account.username;
                            user.idToken = loginResponse.idToken;
                            user.response = loginResponse;
                            user.firstName = userInfo.givenName;
                            user.lastName = userInfo.surname;
                            resolve(user);
                        }
                        else {
                            reject(`Error retrieving user info: ${meRequest.status}`);
                        }
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            };
            //Microsoft Graph ME Endpoint: https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http
            meRequest.open('GET', 'https://graph.microsoft.com/v1.0/me');
            meRequest.setRequestHeader('Authorization', `Bearer ${loginResponse.accessToken}`);
            try {
                meRequest.send();
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getLoginStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = this._instance.getAllAccounts();
            if ((accounts === null || accounts === void 0 ? void 0 : accounts.length) > 0) {
                const loginResponse = yield this._instance.ssoSilent({
                    scopes: this.initOptions.scopes,
                    loginHint: accounts[0].username
                });
                return yield this.getSocialUser(loginResponse);
            }
            else {
                throw `No user is currently logged in with ${MicrosoftLoginProvider.PROVIDER_ID}`;
            }
        });
    }
    signIn() {
        return __awaiter(this, void 0, void 0, function* () {
            const loginResponse = yield this._instance.loginPopup({
                scopes: this.initOptions.scopes
            });
            return yield this.getSocialUser(loginResponse);
        });
    }
    signOut(revoke) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = this._instance.getAllAccounts();
            if ((accounts === null || accounts === void 0 ? void 0 : accounts.length) > 0) {
                //TODO: This redirects to a Microsoft page, then sends us back to redirect_uri... this doesn't seem to match other providers
                //Open issues:
                // https://github.com/abacritt/angularx-social-login/issues/306
                // https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/2563
                yield this._instance.logout({
                    account: accounts[0],
                    postLogoutRedirectUri: (_b = (_a = this.initOptions.logout_redirect_uri) !== null && _a !== void 0 ? _a : this.initOptions.redirect_uri) !== null && _b !== void 0 ? _b : location.href
                });
            }
        });
    }
}
MicrosoftLoginProvider.PROVIDER_ID = 'MICROSOFT';

/**
 * Generated bundle index. Do not edit.
 */

export { AmazonLoginProvider, BaseLoginProvider, DummyLoginProvider, FacebookLoginProvider, GoogleLoginProvider, InstagramLoginProvider, MicrosoftLoginProvider, SocialAuthService, SocialLoginModule, SocialUser, VKLoginProvider };
//# sourceMappingURL=angularx-social-login.js.map
