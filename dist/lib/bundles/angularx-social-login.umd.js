(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angularx-social-login', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (global = global || self, factory(global['angularx-social-login'] = {}, global.ng.core, global.rxjs, global.ng.common));
}(this, (function (exports, i0, rxjs, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var BaseLoginProvider = /** @class */ (function () {
        function BaseLoginProvider() {
        }
        BaseLoginProvider.prototype.loadScript = function (id, src, onload, parentElement) {
            if (parentElement === void 0) { parentElement = null; }
            // get document if platform is only browser
            if (typeof document !== 'undefined' && !document.getElementById(id)) {
                var signInJS = document.createElement('script');
                signInJS.async = true;
                signInJS.src = src;
                signInJS.onload = onload;
                if (!parentElement) {
                    parentElement = document.head;
                }
                parentElement.appendChild(signInJS);
            }
        };
        return BaseLoginProvider;
    }());

    var SocialUser = /** @class */ (function () {
        function SocialUser() {
        }
        return SocialUser;
    }());

    var FacebookLoginProvider = /** @class */ (function (_super) {
        __extends(FacebookLoginProvider, _super);
        function FacebookLoginProvider(clientId, initOptions) {
            if (initOptions === void 0) { initOptions = {
                // scope: 'email,public_profile,user_friends,user_posts',
                scope: 'email,public_profile,user_friends,user_posts',
                locale: 'en_US',
                fields: 'name,email,picture,first_name,last_name,friends{summary{total_count}},posts{full_picture,created_time, comments, reactions}',
                version: 'v4.0',
            }; }
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            _this.initOptions = initOptions;
            return _this;
        }
        FacebookLoginProvider.prototype.initialize = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                try {
                    _this.loadScript(FacebookLoginProvider.PROVIDER_ID, "//connect.facebook.net/" + _this.initOptions.locale + "/sdk.js", function () {
                        FB.init({
                            appId: _this.clientId,
                            autoLogAppEvents: true,
                            cookie: true,
                            xfbml: true,
                            version: _this.initOptions.version,
                        });
                        resolve();
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        };
        FacebookLoginProvider.prototype.getLoginStatus = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        var user = new SocialUser();
                        var authResponse = response.authResponse;
                        user.authToken = authResponse.accessToken;
                        FB.api("/me?fields=" + _this.initOptions.fields, function (fbUser) {
                            var user = new SocialUser();
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
                        reject("No user is currently logged in with " + FacebookLoginProvider.PROVIDER_ID);
                    }
                });
            });
        };
        FacebookLoginProvider.prototype.signIn = function (signInOptions) {
            var options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
            return new Promise(function (resolve, reject) {
                FB.login(function (response) {
                    if (response.authResponse) {
                        var user_1 = new SocialUser();
                        var authResponse = response.authResponse;
                        user_1.authToken = authResponse.accessToken;
                        // resolve(user);
                        console.log('access_token = ', user_1.authToken);
                        FB.api("/me?fields=" + options.fields, function (fbUser) {
                            // FB.api(`/me/permissions=${options.fields}`, (fbUser: any) => {
                            user_1.id = fbUser.id;
                            user_1.name = fbUser.name;
                            user_1.email = fbUser.email;
                            user_1.photoUrl = fbUser.picture.data.url;
                            // 'https://graph.facebook.com/' +
                            // fbUser.id +
                            // '/picture?type=normal';
                            user_1.firstName = fbUser.first_name;
                            user_1.lastName = fbUser.last_name;
                            // user.authToken = authResponse.accessToken;
                            user_1.response = fbUser;
                        });
                        resolve(user_1);
                    }
                    else {
                        reject('User cancelled login or did not fully authorize.');
                    }
                }, options);
            });
        };
        FacebookLoginProvider.prototype.signOut = function () {
            return new Promise(function (resolve, reject) {
                FB.logout(function (response) {
                    resolve();
                });
            });
        };
        return FacebookLoginProvider;
    }(BaseLoginProvider));
    FacebookLoginProvider.PROVIDER_ID = 'FACEBOOK';

    var GoogleLoginProvider = /** @class */ (function (_super) {
        __extends(GoogleLoginProvider, _super);
        function GoogleLoginProvider(clientId, initOptions) {
            if (initOptions === void 0) { initOptions = { scope: 'email' }; }
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            _this.initOptions = initOptions;
            return _this;
        }
        GoogleLoginProvider.prototype.initialize = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                try {
                    _this.loadScript(GoogleLoginProvider.PROVIDER_ID, 'https://apis.google.com/js/platform.js', function () {
                        gapi.load('auth2', function () {
                            _this.auth2 = gapi.auth2.init(Object.assign(Object.assign({}, _this.initOptions), { client_id: _this.clientId }));
                            _this.auth2
                                .then(function () {
                                resolve();
                            })
                                .catch(function (err) {
                                reject(err);
                            });
                        });
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        };
        GoogleLoginProvider.prototype.getLoginStatus = function (loginStatusOptions) {
            var _this = this;
            var options = Object.assign(Object.assign({}, this.initOptions), loginStatusOptions);
            return new Promise(function (resolve, reject) {
                if (_this.auth2.isSignedIn.get()) {
                    var user_1 = new SocialUser();
                    var profile = _this.auth2.currentUser.get().getBasicProfile();
                    user_1.id = profile.getId();
                    user_1.name = profile.getName();
                    user_1.email = profile.getEmail();
                    user_1.photoUrl = profile.getImageUrl();
                    user_1.firstName = profile.getGivenName();
                    user_1.lastName = profile.getFamilyName();
                    user_1.response = profile;
                    var resolveUser = function (authResponse) {
                        user_1.authToken = authResponse.access_token;
                        user_1.idToken = authResponse.id_token;
                        resolve(user_1);
                    };
                    if (options.refreshToken) {
                        _this.auth2.currentUser.get().reloadAuthResponse().then(resolveUser);
                    }
                    else {
                        var authResponse = _this.auth2.currentUser.get().getAuthResponse(true);
                        resolveUser(authResponse);
                    }
                }
                else {
                    reject("No user is currently logged in with " + GoogleLoginProvider.PROVIDER_ID);
                }
            });
        };
        GoogleLoginProvider.prototype.signIn = function (signInOptions) {
            var _this = this;
            var options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
            return new Promise(function (resolve, reject) {
                var offlineAccess = options && options.offline_access;
                var promise = !offlineAccess
                    ? _this.auth2.signIn(signInOptions)
                    : _this.auth2.grantOfflineAccess(signInOptions);
                promise
                    .then(function (response) {
                    var user = new SocialUser();
                    if (response && response.code) {
                        user.authorizationCode = response.code;
                    }
                    else {
                        var profile = _this.auth2.currentUser.get().getBasicProfile();
                        var token = _this.auth2.currentUser.get().getAuthResponse(true)
                            .access_token;
                        var backendToken = _this.auth2.currentUser
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
                }, function (closed) {
                    reject(closed);
                })
                    .catch(function (err) {
                    reject(err);
                });
            });
        };
        GoogleLoginProvider.prototype.signOut = function (revoke) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var signOutPromise;
                if (revoke) {
                    signOutPromise = _this.auth2.disconnect();
                }
                else {
                    signOutPromise = _this.auth2.signOut();
                }
                signOutPromise
                    .then(function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                })
                    .catch(function (err) {
                    reject(err);
                });
            });
        };
        return GoogleLoginProvider;
    }(BaseLoginProvider));
    GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';

    /** @dynamic */
    var SocialAuthService = /** @class */ (function () {
        function SocialAuthService(config) {
            var _this = this;
            this.providers = new Map();
            this.autoLogin = false;
            this._user_google = null;
            this._user_fb = null;
            this._user_insta = null;
            this._authState_google = new rxjs.ReplaySubject(1);
            this._authState_fb = new rxjs.ReplaySubject(1);
            this._authState_insta = new rxjs.ReplaySubject(1);
            /* Consider making this an enum comprising LOADING, LOADED, FAILED etc. */
            this.initialized = false;
            this._initState = new rxjs.AsyncSubject();
            if (config instanceof Promise) {
                config.then(function (config) {
                    _this.initialize(config);
                });
            }
            else {
                this.initialize(config);
            }
        }
        Object.defineProperty(SocialAuthService.prototype, "authState_google", {
            get: function () {
                return this._authState_google.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SocialAuthService.prototype, "authState_fb", {
            get: function () {
                return this._authState_fb.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SocialAuthService.prototype, "authState_insta", {
            get: function () {
                return this._authState_insta.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SocialAuthService.prototype, "initState", {
            get: function () {
                return this._initState.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        SocialAuthService.prototype.initialize = function (config) {
            var _this = this;
            this.autoLogin = config.autoLogin !== undefined ? config.autoLogin : false;
            var _a = config.onError, onError = _a === void 0 ? console.error : _a;
            config.providers.forEach(function (item) {
                _this.providers.set(item.id, item.provider);
            });
            Promise.all(Array.from(this.providers.values()).map(function (provider) { return provider.initialize(); }))
                .then(function () {
                if (_this.autoLogin) {
                    var loginStatusPromises_1 = [];
                    var loggedIn_google_1 = false;
                    var loggedIn_fb_1 = false;
                    var loggedIn_insta_1 = false;
                    _this.providers.forEach(function (provider, key) {
                        var promise = provider.getLoginStatus();
                        loginStatusPromises_1.push(promise);
                        promise
                            .then(function (user) {
                            user.provider = key;
                            if (key === GoogleLoginProvider.PROVIDER_ID) {
                                _this._user_google = user;
                                _this._authState_google.next(user);
                                loggedIn_google_1 = true; //todo
                            }
                            else if (key === FacebookLoginProvider.PROVIDER_ID) {
                                _this._user_fb = user;
                                _this._authState_fb.next(user);
                                loggedIn_fb_1 = true;
                            }
                            else {
                                _this._user_insta = user;
                                _this._authState_insta.next(user);
                                loggedIn_insta_1 = true;
                            }
                        })
                            .catch(console.debug);
                    });
                    Promise.all(loginStatusPromises_1).catch(function () {
                        if (!loggedIn_fb_1) {
                            _this._user_fb = null; //todo
                            _this._authState_fb.next(null);
                        }
                        if (!loggedIn_google_1) {
                            _this._user_google = null; //todo
                            _this._authState_google.next(null);
                        }
                        if (!loggedIn_insta_1) {
                            _this._user_insta = null; //todo
                            _this._authState_insta.next(null);
                        }
                    });
                }
            })
                .catch(function (error) {
                onError(error);
            })
                .finally(function () {
                _this.initialized = true;
                _this._initState.next(_this.initialized);
                _this._initState.complete();
            });
        };
        SocialAuthService.prototype.refreshAuthToken = function (providerId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!_this.initialized) {
                    reject(SocialAuthService.ERR_NOT_INITIALIZED);
                }
                else if (providerId !== GoogleLoginProvider.PROVIDER_ID) {
                    reject(SocialAuthService.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN);
                }
                else {
                    var providerObject = _this.providers.get(providerId);
                    if (providerObject) {
                        providerObject
                            .getLoginStatus({ refreshToken: true })
                            .then(function (user) {
                            user.provider = providerId;
                            if (providerId === GoogleLoginProvider.PROVIDER_ID) {
                                _this._user_google = user;
                                _this._authState_google.next(user);
                            }
                            else if (providerId === FacebookLoginProvider.PROVIDER_ID) {
                                _this._user_fb = user;
                                _this._authState_fb.next(user);
                            }
                            else {
                                _this._user_insta = user;
                                _this._authState_insta.next(user);
                            }
                            resolve();
                        })
                            .catch(function (err) {
                            reject(err);
                        });
                    }
                    else {
                        reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                    }
                }
            });
        };
        SocialAuthService.prototype.signIn = function (providerId, signInOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!_this.initialized) {
                    reject(SocialAuthService.ERR_NOT_INITIALIZED);
                }
                else {
                    var providerObject = _this.providers.get(providerId);
                    if (providerObject) {
                        providerObject
                            .signIn(signInOptions)
                            .then(function (user) {
                            user.provider = providerId;
                            resolve(user);
                            if (providerId === GoogleLoginProvider.PROVIDER_ID) {
                                _this._user_google = user;
                                _this._authState_google.next(user);
                            }
                            else if (providerId === FacebookLoginProvider.PROVIDER_ID) {
                                _this._user_fb = user;
                                _this._authState_fb.next(user);
                            }
                            else {
                                _this._user_insta = user;
                                _this._authState_insta.next(user);
                            }
                        })
                            .catch(function (err) {
                            reject(err);
                        });
                    }
                    else {
                        reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                    }
                }
            });
        };
        SocialAuthService.prototype.signOut = function (providerId, revoke) {
            var _this = this;
            if (revoke === void 0) { revoke = false; }
            console.log(providerId);
            if (providerId === GoogleLoginProvider.PROVIDER_ID) {
                return new Promise(function (resolve, reject) {
                    if (!_this.initialized) {
                        reject(SocialAuthService.ERR_NOT_INITIALIZED);
                    }
                    else if (!_this._user_google) {
                        reject(SocialAuthService.ERR_NOT_LOGGED_IN);
                    }
                    else {
                        var providerId_1 = _this._user_google.provider;
                        var providerObject = _this.providers.get(providerId_1);
                        if (providerObject) {
                            providerObject
                                .signOut(revoke)
                                .then(function () {
                                resolve();
                                _this._user_google = null;
                                _this._authState_google.next(null);
                            })
                                .catch(function (err) {
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
                return new Promise(function (resolve, reject) {
                    if (!_this.initialized) {
                        reject(SocialAuthService.ERR_NOT_INITIALIZED);
                    }
                    else if (!_this._user_fb) {
                        reject(SocialAuthService.ERR_NOT_LOGGED_IN);
                    }
                    else {
                        var providerId_2 = _this._user_fb.provider;
                        var providerObject = _this.providers.get(providerId_2);
                        if (providerObject) {
                            providerObject
                                .signOut(revoke)
                                .then(function () {
                                resolve();
                                _this._user_fb = null;
                                _this._authState_fb.next(null);
                            })
                                .catch(function (err) {
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
                return new Promise(function (resolve, reject) {
                    if (!_this.initialized) {
                        reject(SocialAuthService.ERR_NOT_INITIALIZED);
                    }
                    else if (!_this._user_insta) {
                        reject(SocialAuthService.ERR_NOT_LOGGED_IN);
                    }
                    else {
                        var providerId_3 = _this._user_insta.provider;
                        var providerObject = _this.providers.get(providerId_3);
                        if (providerObject) {
                            providerObject
                                .signOut(revoke)
                                .then(function () {
                                resolve();
                                _this._user_insta = null;
                                _this._authState_insta.next(null);
                            })
                                .catch(function (err) {
                                reject(err);
                            });
                        }
                        else {
                            reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                        }
                    }
                });
            }
        };
        return SocialAuthService;
    }());
    SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
    SocialAuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
    SocialAuthService.ERR_NOT_INITIALIZED = 'Login providers not ready yet. Are there errors on your console?';
    SocialAuthService.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN = 'Chosen login provider is not supported for refreshing a token';
    SocialAuthService.ɵfac = function SocialAuthService_Factory(t) { return new (t || SocialAuthService)(i0.ɵɵinject('SocialAuthServiceConfig')); };
    SocialAuthService.ɵprov = i0.ɵɵdefineInjectable({ token: SocialAuthService, factory: SocialAuthService.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SocialAuthService, [{
                type: i0.Injectable
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: ['SocialAuthServiceConfig']
                        }] }];
        }, null);
    })();

    var SocialLoginModule = /** @class */ (function () {
        function SocialLoginModule(parentModule) {
            if (parentModule) {
                throw new Error('SocialLoginModule is already loaded. Import it in the AppModule only');
            }
        }
        SocialLoginModule.initialize = function (config) {
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
        };
        return SocialLoginModule;
    }());
    SocialLoginModule.ɵmod = i0.ɵɵdefineNgModule({ type: SocialLoginModule });
    SocialLoginModule.ɵinj = i0.ɵɵdefineInjector({ factory: function SocialLoginModule_Factory(t) { return new (t || SocialLoginModule)(i0.ɵɵinject(SocialLoginModule, 12)); }, providers: [
            SocialAuthService
        ], imports: [[
                common.CommonModule
            ]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SocialLoginModule, { imports: [common.CommonModule] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SocialLoginModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule
                        ],
                        providers: [
                            SocialAuthService
                        ]
                    }]
            }], function () {
            return [{ type: SocialLoginModule, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.SkipSelf
                        }] }];
        }, null);
    })();

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
    var DummyLoginProvider = /** @class */ (function (_super) {
        __extends(DummyLoginProvider, _super);
        function DummyLoginProvider(dummy) {
            var _this = _super.call(this) || this;
            if (dummy) {
                _this.dummy = dummy;
            }
            else {
                _this.dummy = DummyLoginProvider.DEFAULT_USER;
            }
            // Start not logged in
            _this.loggedIn = false;
            return _this;
        }
        DummyLoginProvider.prototype.getLoginStatus = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.loggedIn) {
                    resolve(_this.dummy);
                }
                else {
                    reject('No user is currently logged in.');
                }
            });
        };
        DummyLoginProvider.prototype.initialize = function () {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        };
        DummyLoginProvider.prototype.signIn = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.loggedIn = true;
                resolve(_this.dummy);
            });
        };
        DummyLoginProvider.prototype.signOut = function (revoke) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.loggedIn = false;
                resolve();
            });
        };
        return DummyLoginProvider;
    }(BaseLoginProvider));
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

    var InstagramLoginProvider = /** @class */ (function (_super) {
        __extends(InstagramLoginProvider, _super);
        function InstagramLoginProvider(clientId, initOptions, initInstaOptions) {
            if (initOptions === void 0) { initOptions = {
                scope: 'email,public_profile,read_insights,pages_show_list,instagram_basic,instagram_manage_insights,pages_read_engagement',
                locale: 'en_US',
                fields: 'id',
                version: 'v4.0',
            }; }
            if (initInstaOptions === void 0) { initInstaOptions = {
                feilds: 'username, profile_picture_url'
            }; }
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            _this.initOptions = initOptions;
            _this.initInstaOptions = initInstaOptions;
            return _this;
        }
        InstagramLoginProvider.prototype.initialize = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                try {
                    _this.loadScript(InstagramLoginProvider.PROVIDER_ID, "//connect.facebook.net/" + _this.initOptions.locale + "/sdk.js", function () {
                        FB.init({
                            appId: _this.clientId,
                            autoLogAppEvents: true,
                            cookie: true,
                            xfbml: true,
                            version: _this.initOptions.version,
                        });
                        resolve();
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        };
        InstagramLoginProvider.prototype.getLoginStatus = function () {
            return new Promise(function (resolve, reject) {
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        var authResponse = response.authResponse;
                        var user_1 = new SocialUser();
                        // user.response = fbUser;
                        user_1.authToken = authResponse.accessToken;
                        FB.api("/me/accounts? fields=instagram_business_account{name, username, ig_id, profile_picture_url, followers_count, media_count, media{comments_count, like_count, timestamp, comments, media_url}}, name, link, picture", function (fbUser) {
                            user_1.response = fbUser;
                            // user.authToken = authResponse;
                            if (fbUser.data.length !== 0) {
                                var i = void 0;
                                var flag = false;
                                for (i = 0; i < fbUser.data.length; i++) {
                                    if (fbUser.data[i].instagram_business_account != null && fbUser.data[i].id != null) {
                                        flag = true;
                                        user_1.name = fbUser.data[i].instagram_business_account.username; // todo
                                        user_1.photoUrl = fbUser.data[i].instagram_business_account.profile_picture_url; //todo               
                                    }
                                }
                                if (flag) {
                                    resolve(user_1);
                                }
                                else
                                    reject('User cancelled login or did not fully authorize.');
                            }
                            else
                                reject('User cancelled login or did not fully authorize.');
                        });
                    }
                    else {
                        reject("No user is currently logged in with " + InstagramLoginProvider.PROVIDER_ID);
                    }
                });
            });
        };
        InstagramLoginProvider.prototype.signIn = function (signInOptions) {
            var options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
            return new Promise(function (resolve, reject) {
                FB.login(function (response) {
                    if (response.authResponse) {
                        var authResponse = response.authResponse;
                        var user_2 = new SocialUser();
                        user_2.authToken = authResponse.accessToken;
                        // resolve(user);
                        FB.api("/me/accounts? fields=instagram_business_account{name, username, ig_id, profile_picture_url, followers_count, media_count, media{comments_count, like_count, timestamp, comments, media_url}}, name, link, picture", function (fbUser) {
                            user_2.response = fbUser;
                            if (fbUser.data.length !== 0) {
                                var i = void 0;
                                var flag = false;
                                for (i = 0; i < fbUser.data.length; i++) {
                                    if (fbUser.data[i].instagram_business_account != null && fbUser.data[i].id != null) {
                                        flag = true;
                                    }
                                }
                                if (flag) {
                                    resolve(user_2);
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
        };
        InstagramLoginProvider.prototype.signOut = function () {
            return new Promise(function (resolve, reject) {
                FB.logout(function (response) {
                    resolve();
                });
            });
        };
        return InstagramLoginProvider;
    }(BaseLoginProvider));
    InstagramLoginProvider.PROVIDER_ID = 'INSTAGRAM';

    var AmazonLoginProvider = /** @class */ (function (_super) {
        __extends(AmazonLoginProvider, _super);
        function AmazonLoginProvider(clientId, initOptions) {
            if (initOptions === void 0) { initOptions = {
                scope: 'profile',
                scope_data: {
                    profile: { essential: false },
                },
                redirect_uri: location.origin,
            }; }
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            _this.initOptions = initOptions;
            return _this;
        }
        AmazonLoginProvider.prototype.initialize = function () {
            var _this = this;
            var amazonRoot = null;
            if (document) {
                amazonRoot = document.createElement('div');
                amazonRoot.id = 'amazon-root';
                document.body.appendChild(amazonRoot);
            }
            window.onAmazonLoginReady = function () {
                amazon.Login.setClientId(_this.clientId);
            };
            return new Promise(function (resolve, reject) {
                try {
                    _this.loadScript('amazon-login-sdk', 'https://assets.loginwithamazon.com/sdk/na/login1.js', function () {
                        resolve();
                    }, amazonRoot);
                }
                catch (err) {
                    reject(err);
                }
            });
        };
        AmazonLoginProvider.prototype.getLoginStatus = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var token = _this.retrieveToken();
                if (token) {
                    amazon.Login.retrieveProfile(token, function (response) {
                        if (response.success) {
                            var user = new SocialUser();
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
                    reject("No user is currently logged in with " + AmazonLoginProvider.PROVIDER_ID);
                }
            });
        };
        AmazonLoginProvider.prototype.signIn = function (signInOptions) {
            var _this = this;
            var options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
            return new Promise(function (resolve, reject) {
                amazon.Login.authorize(options, function (authResponse) {
                    if (authResponse.error) {
                        reject(authResponse.error);
                    }
                    else {
                        amazon.Login.retrieveProfile(authResponse.access_token, function (response) {
                            var user = new SocialUser();
                            user.id = response.profile.CustomerId;
                            user.name = response.profile.Name;
                            user.email = response.profile.PrimaryEmail;
                            user.authToken = authResponse.access_token;
                            user.response = response.profile;
                            _this.persistToken(authResponse.access_token);
                            resolve(user);
                        });
                    }
                });
            });
        };
        AmazonLoginProvider.prototype.signOut = function (revoke) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                try {
                    amazon.Login.logout();
                    _this.clearToken();
                    resolve();
                }
                catch (err) {
                    reject(err.message);
                }
            });
        };
        AmazonLoginProvider.prototype.persistToken = function (token) {
            localStorage.setItem(AmazonLoginProvider.PROVIDER_ID + "_token", token);
        };
        AmazonLoginProvider.prototype.retrieveToken = function () {
            return localStorage.getItem(AmazonLoginProvider.PROVIDER_ID + "_token");
        };
        AmazonLoginProvider.prototype.clearToken = function () {
            localStorage.removeItem(AmazonLoginProvider.PROVIDER_ID + "_token");
        };
        return AmazonLoginProvider;
    }(BaseLoginProvider));
    AmazonLoginProvider.PROVIDER_ID = 'AMAZON';

    var VKLoginProvider = /** @class */ (function (_super) {
        __extends(VKLoginProvider, _super);
        function VKLoginProvider(clientId, initOptions) {
            if (initOptions === void 0) { initOptions = {
                fields: 'photo_max,contacts',
                version: '5.124',
            }; }
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            _this.initOptions = initOptions;
            _this.VK_API_URL = '//vk.com/js/api/openapi.js';
            _this.VK_API_GET_USER = 'users.get';
            return _this;
        }
        VKLoginProvider.prototype.initialize = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                try {
                    _this.loadScript(VKLoginProvider.PROVIDER_ID, _this.VK_API_URL, function () {
                        VK.init({
                            apiId: _this.clientId,
                        });
                        resolve();
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        };
        VKLoginProvider.prototype.getLoginStatus = function () {
            var _this = this;
            return new Promise(function (resolve, reject) { return _this.getLoginStatusInternal(resolve, reject); });
        };
        VKLoginProvider.prototype.signIn = function () {
            var _this = this;
            return new Promise(function (resolve, reject) { return _this.signInInternal(resolve, reject); });
        };
        VKLoginProvider.prototype.signOut = function () {
            return new Promise(function (resolve, reject) {
                VK.Auth.logout(function (response) {
                    resolve();
                });
            });
        };
        VKLoginProvider.prototype.signInInternal = function (resolve, reject) {
            var _this = this;
            VK.Auth.login(function (loginResponse) {
                if (loginResponse.status === 'connected') {
                    _this.getUser(loginResponse.session.mid, loginResponse.session.sid, resolve);
                }
            });
        };
        VKLoginProvider.prototype.getUser = function (userId, token, resolve) {
            var _this = this;
            VK.Api.call(this.VK_API_GET_USER, {
                user_id: userId,
                fields: this.initOptions.fields,
                v: this.initOptions.version,
            }, function (userResponse) {
                resolve(_this.createUser(Object.assign({}, { token: token }, userResponse.response[0])));
            });
        };
        VKLoginProvider.prototype.getLoginStatusInternal = function (resolve, reject) {
            var _this = this;
            VK.Auth.getLoginStatus(function (loginResponse) {
                if (loginResponse.status === 'connected') {
                    _this.getUser(loginResponse.session.mid, loginResponse.session.sid, resolve);
                }
            });
        };
        VKLoginProvider.prototype.createUser = function (response) {
            var user = new SocialUser();
            user.id = response.id;
            user.name = response.first_name + " " + response.last_name;
            user.photoUrl = response.photo_max;
            user.authToken = response.token;
            return user;
        };
        return VKLoginProvider;
    }(BaseLoginProvider));
    VKLoginProvider.PROVIDER_ID = 'VK';

    /**
     * Protocol modes supported by MSAL.
     */
    var ProtocolMode;
    (function (ProtocolMode) {
        ProtocolMode["AAD"] = "AAD";
        ProtocolMode["OIDC"] = "OIDC";
    })(ProtocolMode || (ProtocolMode = {}));
    var COMMON_AUTHORITY = 'https://login.microsoftonline.com/common/';
    /**
     * Microsoft Authentication using MSAL v2: https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser
     */
    var MicrosoftLoginProvider = /** @class */ (function (_super) {
        __extends(MicrosoftLoginProvider, _super);
        function MicrosoftLoginProvider(clientId, initOptions) {
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            _this.initOptions = {
                authority: COMMON_AUTHORITY,
                scopes: ['openid', 'email', 'profile', 'User.Read'],
                knownAuthorities: [],
                protocolMode: ProtocolMode.AAD,
                clientCapabilities: [],
                cacheLocation: 'sessionStorage'
            };
            _this.initOptions = Object.assign(Object.assign({}, _this.initOptions), initOptions);
            return _this;
        }
        MicrosoftLoginProvider.prototype.initialize = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.loadScript(MicrosoftLoginProvider.PROVIDER_ID, 'https://alcdn.msauth.net/browser/2.1.0/js/msal-browser.js', function () {
                    var _a;
                    try {
                        var config = {
                            auth: {
                                clientId: _this.clientId,
                                redirectUri: (_a = _this.initOptions.redirect_uri) !== null && _a !== void 0 ? _a : location.origin,
                                authority: _this.initOptions.authority,
                                knownAuthorities: _this.initOptions.knownAuthorities,
                                protocolMode: _this.initOptions.protocolMode,
                                clientCapabilities: _this.initOptions.clientCapabilities
                            },
                            cache: !_this.initOptions.cacheLocation ? null : {
                                cacheLocation: _this.initOptions.cacheLocation
                            }
                        };
                        _this._instance = new msal.PublicClientApplication(config);
                        resolve();
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
        };
        MicrosoftLoginProvider.prototype.getSocialUser = function (loginResponse) {
            return new Promise(function (resolve, reject) {
                //After login, use Microsoft Graph API to get user info
                var meRequest = new XMLHttpRequest();
                meRequest.onreadystatechange = function () {
                    if (meRequest.readyState == 4) {
                        try {
                            if (meRequest.status == 200) {
                                var userInfo = JSON.parse(meRequest.responseText);
                                var user = new SocialUser();
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
                                reject("Error retrieving user info: " + meRequest.status);
                            }
                        }
                        catch (err) {
                            reject(err);
                        }
                    }
                };
                //Microsoft Graph ME Endpoint: https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http
                meRequest.open('GET', 'https://graph.microsoft.com/v1.0/me');
                meRequest.setRequestHeader('Authorization', "Bearer " + loginResponse.accessToken);
                try {
                    meRequest.send();
                }
                catch (err) {
                    reject(err);
                }
            });
        };
        MicrosoftLoginProvider.prototype.getLoginStatus = function () {
            return __awaiter(this, void 0, void 0, function () {
                var accounts, loginResponse;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            accounts = this._instance.getAllAccounts();
                            if (!((accounts === null || accounts === void 0 ? void 0 : accounts.length) > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this._instance.ssoSilent({
                                    scopes: this.initOptions.scopes,
                                    loginHint: accounts[0].username
                                })];
                        case 1:
                            loginResponse = _c.sent();
                            return [4 /*yield*/, this.getSocialUser(loginResponse)];
                        case 2: return [2 /*return*/, _c.sent()];
                        case 3: throw "No user is currently logged in with " + MicrosoftLoginProvider.PROVIDER_ID;
                    }
                });
            });
        };
        MicrosoftLoginProvider.prototype.signIn = function () {
            return __awaiter(this, void 0, void 0, function () {
                var loginResponse;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this._instance.loginPopup({
                                scopes: this.initOptions.scopes
                            })];
                        case 1:
                            loginResponse = _c.sent();
                            return [4 /*yield*/, this.getSocialUser(loginResponse)];
                        case 2: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        MicrosoftLoginProvider.prototype.signOut = function (revoke) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var accounts;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            accounts = this._instance.getAllAccounts();
                            if (!((accounts === null || accounts === void 0 ? void 0 : accounts.length) > 0)) return [3 /*break*/, 2];
                            //TODO: This redirects to a Microsoft page, then sends us back to redirect_uri... this doesn't seem to match other providers
                            //Open issues:
                            // https://github.com/abacritt/angularx-social-login/issues/306
                            // https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/2563
                            return [4 /*yield*/, this._instance.logout({
                                    account: accounts[0],
                                    postLogoutRedirectUri: (_b = (_a = this.initOptions.logout_redirect_uri) !== null && _a !== void 0 ? _a : this.initOptions.redirect_uri) !== null && _b !== void 0 ? _b : location.href
                                })];
                        case 1:
                            //TODO: This redirects to a Microsoft page, then sends us back to redirect_uri... this doesn't seem to match other providers
                            //Open issues:
                            // https://github.com/abacritt/angularx-social-login/issues/306
                            // https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/2563
                            _c.sent();
                            _c.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return MicrosoftLoginProvider;
    }(BaseLoginProvider));
    MicrosoftLoginProvider.PROVIDER_ID = 'MICROSOFT';

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AmazonLoginProvider = AmazonLoginProvider;
    exports.BaseLoginProvider = BaseLoginProvider;
    exports.DummyLoginProvider = DummyLoginProvider;
    exports.FacebookLoginProvider = FacebookLoginProvider;
    exports.GoogleLoginProvider = GoogleLoginProvider;
    exports.InstagramLoginProvider = InstagramLoginProvider;
    exports.MicrosoftLoginProvider = MicrosoftLoginProvider;
    exports.SocialAuthService = SocialAuthService;
    exports.SocialLoginModule = SocialLoginModule;
    exports.SocialUser = SocialUser;
    exports.VKLoginProvider = VKLoginProvider;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angularx-social-login.umd.js.map
