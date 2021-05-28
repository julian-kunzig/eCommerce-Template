import { __awaiter } from "tslib";
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
/**
 * Protocol modes supported by MSAL.
 */
export var ProtocolMode;
(function (ProtocolMode) {
    ProtocolMode["AAD"] = "AAD";
    ProtocolMode["OIDC"] = "OIDC";
})(ProtocolMode || (ProtocolMode = {}));
const COMMON_AUTHORITY = 'https://login.microsoftonline.com/common/';
/**
 * Microsoft Authentication using MSAL v2: https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser
 */
export class MicrosoftLoginProvider extends BaseLoginProvider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm9zb2Z0LWxvZ2luLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2FsZXhoL0Rlc2t0b3AvaW5maW5vdmFlL3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJwcm92aWRlcnMvbWljcm9zb2Z0LWxvZ2luLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFckQ7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxZQUdYO0FBSEQsV0FBWSxZQUFZO0lBQ3RCLDJCQUFXLENBQUE7SUFDWCw2QkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhXLFlBQVksS0FBWixZQUFZLFFBR3ZCO0FBZ0ZELE1BQU0sZ0JBQWdCLEdBQVcsMkNBQTJDLENBQUM7QUFFN0U7O0dBRUc7QUFDSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsaUJBQWlCO0lBYTNELFlBQ1UsUUFBZ0IsRUFDeEIsV0FBOEI7UUFFOUIsS0FBSyxFQUFFLENBQUM7UUFIQSxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBVmxCLGdCQUFXLEdBQXFCO1lBQ3RDLFNBQVMsRUFBRSxnQkFBZ0I7WUFDM0IsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDO1lBQ25ELGdCQUFnQixFQUFFLEVBQUU7WUFDcEIsWUFBWSxFQUFFLFlBQVksQ0FBQyxHQUFHO1lBQzlCLGtCQUFrQixFQUFFLEVBQUU7WUFDdEIsYUFBYSxFQUFFLGdCQUFnQjtTQUNoQyxDQUFDO1FBUUEsSUFBSSxDQUFDLFdBQVcsbUNBQ1gsSUFBSSxDQUFDLFdBQVcsR0FDaEIsV0FBVyxDQUNmLENBQUM7SUFDSixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFF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QWMsRUFBRSxDQUFDO1lBQ2pELElBQUksQ0FBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsTUFBTSxJQUFHLENBQUMsRUFBRTtnQkFDeEIsNEhBQTRIO2dCQUM1SCxjQUFjO2dCQUNkLCtEQUErRDtnQkFDL0QsaUZBQWlGO2dCQUNqRixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO29CQUMxQixPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDcEIscUJBQXFCLGNBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsbUNBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLG1DQUFJLFFBQVEsQ0FBQyxJQUFJO2lCQUM5RyxDQUFDLENBQUE7YUFDSDs7S0FDRjs7QUFoSXNCLGtDQUFXLEdBQVcsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUxvZ2luUHJvdmlkZXIgfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4uL2VudGl0aWVzL3NvY2lhbC11c2VyJztcclxuXHJcbi8qKlxyXG4gKiBQcm90b2NvbCBtb2RlcyBzdXBwb3J0ZWQgYnkgTVNBTC5cclxuICovXHJcbmV4cG9ydCBlbnVtIFByb3RvY29sTW9kZSB7XHJcbiAgQUFEID0gJ0FBRCcsXHJcbiAgT0lEQyA9ICdPSURDJ1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6YXRpb24gT3B0aW9ucyBmb3IgTWljcm9zb2Z0IFByb3ZpZGVyOiBodHRwczovL2dpdGh1Yi5jb20vQXp1cmVBRC9taWNyb3NvZnQtYXV0aGVudGljYXRpb24tbGlicmFyeS1mb3ItanMvYmxvYi9kZXYvbGliL21zYWwtYnJvd3Nlci9kb2NzL2luaXRpYWxpemF0aW9uLm1kXHJcbiAqIERldGFpbHMgKG5vdCBhbGwgb3B0aW9ucyBhcmUgc3VwcG9ydGVkKTogaHR0cHM6Ly9naXRodWIuY29tL0F6dXJlQUQvbWljcm9zb2Z0LWF1dGhlbnRpY2F0aW9uLWxpYnJhcnktZm9yLWpzL2Jsb2IvZGV2L2xpYi9tc2FsLWJyb3dzZXIvZG9jcy9jb25maWd1cmF0aW9uLm1kXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBNaWNyb3NvZnRPcHRpb25zID0ge1xyXG4gIHJlZGlyZWN0X3VyaT86IHN0cmluZyxcclxuICBsb2dvdXRfcmVkaXJlY3RfdXJpPzogc3RyaW5nLFxyXG4gIGF1dGhvcml0eT86IHN0cmluZyxcclxuICBrbm93bkF1dGhvcml0aWVzPzogc3RyaW5nW10sXHJcbiAgcHJvdG9jb2xNb2RlPzogUHJvdG9jb2xNb2RlLFxyXG4gIGNsaWVudENhcGFiaWxpdGllcz86IHN0cmluZ1tdLFxyXG4gIGNhY2hlTG9jYXRpb24/OiBzdHJpbmcsXHJcbiAgc2NvcGVzPzogc3RyaW5nW11cclxufTtcclxuXHJcbi8vIENvbGxlY3Rpb24gb2YgaW50ZXJuYWwgTVNBTCBpbnRlcmZhY2VzIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9BenVyZUFEL21pY3Jvc29mdC1hdXRoZW50aWNhdGlvbi1saWJyYXJ5LWZvci1qcy90cmVlL2Rldi9saWIvbXNhbC1icm93c2VyL3NyY1xyXG5cclxuaW50ZXJmYWNlIE1TQUxBY2NvdW50IHtcclxuICBlbnZpcm9ubWVudDogc3RyaW5nO1xyXG4gIGhvbWVBY2NvdW50SWQ6IHN0cmluZztcclxuICB0ZW5hbnRJZDogc3RyaW5nO1xyXG4gIHVzZXJuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBNU0dyYXBoVXNlckluZm8ge1xyXG4gIGJ1c2luZXNzUGhvbmVzOiBzdHJpbmdbXTtcclxuICBkaXNwbGF5TmFtZTogc3RyaW5nO1xyXG4gIGdpdmVuTmFtZTogc3RyaW5nO1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgam9iVGl0bGU6IHN0cmluZztcclxuICBtYWlsOiBzdHJpbmc7XHJcbiAgbW9iaWxlUGhvbmU6IHN0cmluZztcclxuICBvZmZpY2VMb2NhdGlvbjogc3RyaW5nO1xyXG4gIHByZWZlcnJlZExhbmd1YWdlOiBzdHJpbmc7XHJcbiAgc3VybmFtZTogc3RyaW5nO1xyXG4gIHVzZXJQcmluY2lwYWxOYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBNU0FMTG9naW5SZXF1ZXN0IHtcclxuICBzY29wZXM/OiBzdHJpbmdbXTtcclxuICBzaWQ/OiBzdHJpbmc7XHJcbiAgbG9naW5IaW50Pzogc3RyaW5nO1xyXG4gIGRvbWFpbkhpbnQ/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBNU0FMTG9naW5SZXNwb25zZSB7XHJcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcclxuICBhY2NvdW50OiBNU0FMQWNjb3VudDtcclxuICBleHBpcmVzT246IERhdGU7XHJcbiAgZXh0RXhwaXJlc09uOiBEYXRlO1xyXG4gIGZhbWlseUlkOiBzdHJpbmc7XHJcbiAgZnJvbUNhY2hlOiBib29sZWFuO1xyXG4gIGlkVG9rZW46IHN0cmluZztcclxuICBpZFRva2VuQ2xhaW1zOiBhbnk7XHJcbiAgc2NvcGVzOiBzdHJpbmdbXTtcclxuICBzdGF0ZTogc3RyaW5nO1xyXG4gIHRlbmFudElkOiBzdHJpbmc7XHJcbiAgdW5pcXVlSWQ6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIE1TQUxMb2dvdXRSZXF1ZXN0IHtcclxuICBhY2NvdW50PzogTVNBTEFjY291bnQ7XHJcbiAgcG9zdExvZ291dFJlZGlyZWN0VXJpPzogc3RyaW5nO1xyXG4gIGF1dGhvcml0eT86IHN0cmluZztcclxuICBjb3JyZWxhdGlvbklkPzogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgTVNBTENsaWVudEFwcGxpY2F0aW9uIHtcclxuICBnZXRBbGxBY2NvdW50cygpOiBNU0FMQWNjb3VudFtdO1xyXG4gIGxvZ291dChsb2dvdXRSZXF1ZXN0PzogTVNBTExvZ291dFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+O1xyXG4gIGxvZ2luUG9wdXAobG9naW5SZXF1ZXN0OiBNU0FMTG9naW5SZXF1ZXN0KTogUHJvbWlzZTxNU0FMTG9naW5SZXNwb25zZT47XHJcbiAgc3NvU2lsZW50KGxvZ2luUmVxdWVzdDogTVNBTExvZ2luUmVxdWVzdCk6IFByb21pc2U8TVNBTExvZ2luUmVzcG9uc2U+O1xyXG4gIGFjcXVpcmVUb2tlblNpbGVudChsb2dpblJlcXVlc3Q6IE1TQUxMb2dpblJlcXVlc3QpOiBQcm9taXNlPE1TQUxMb2dpblJlc3BvbnNlPjtcclxuICBnZXRBY2NvdW50QnlIb21lSWQoaG9tZUFjY291bnRJZDogc3RyaW5nKTogTVNBTEFjY291bnQ7XHJcbn1cclxuXHJcbmRlY2xhcmUgbGV0IG1zYWw6IGFueTtcclxuXHJcbmNvbnN0IENPTU1PTl9BVVRIT1JJVFk6IHN0cmluZyA9ICdodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vY29tbW9uLyc7XHJcblxyXG4vKipcclxuICogTWljcm9zb2Z0IEF1dGhlbnRpY2F0aW9uIHVzaW5nIE1TQUwgdjI6IGh0dHBzOi8vZ2l0aHViLmNvbS9BenVyZUFEL21pY3Jvc29mdC1hdXRoZW50aWNhdGlvbi1saWJyYXJ5LWZvci1qcy90cmVlL2Rldi9saWIvbXNhbC1icm93c2VyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWljcm9zb2Z0TG9naW5Qcm92aWRlciBleHRlbmRzIEJhc2VMb2dpblByb3ZpZGVyIHtcclxuICBwcml2YXRlIF9pbnN0YW5jZTogTVNBTENsaWVudEFwcGxpY2F0aW9uO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUFJPVklERVJfSUQ6IHN0cmluZyA9ICdNSUNST1NPRlQnO1xyXG5cclxuICBwcml2YXRlIGluaXRPcHRpb25zOiBNaWNyb3NvZnRPcHRpb25zID0ge1xyXG4gICAgYXV0aG9yaXR5OiBDT01NT05fQVVUSE9SSVRZLFxyXG4gICAgc2NvcGVzOiBbJ29wZW5pZCcsICdlbWFpbCcsICdwcm9maWxlJywgJ1VzZXIuUmVhZCddLFxyXG4gICAga25vd25BdXRob3JpdGllczogW10sXHJcbiAgICBwcm90b2NvbE1vZGU6IFByb3RvY29sTW9kZS5BQUQsXHJcbiAgICBjbGllbnRDYXBhYmlsaXRpZXM6IFtdLFxyXG4gICAgY2FjaGVMb2NhdGlvbjogJ3Nlc3Npb25TdG9yYWdlJ1xyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjbGllbnRJZDogc3RyaW5nLFxyXG4gICAgaW5pdE9wdGlvbnM/OiBNaWNyb3NvZnRPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMuaW5pdE9wdGlvbnMgPSB7XHJcbiAgICAgIC4uLnRoaXMuaW5pdE9wdGlvbnMsXHJcbiAgICAgIC4uLmluaXRPcHRpb25zXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMubG9hZFNjcmlwdChcclxuICAgICAgICBNaWNyb3NvZnRMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lELFxyXG4gICAgICAgICdodHRwczovL2FsY2RuLm1zYXV0aC5uZXQvYnJvd3Nlci8yLjEuMC9qcy9tc2FsLWJyb3dzZXIuanMnLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICBhdXRoOiB7XHJcbiAgICAgICAgICAgICAgICBjbGllbnRJZDogdGhpcy5jbGllbnRJZCxcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0VXJpOiB0aGlzLmluaXRPcHRpb25zLnJlZGlyZWN0X3VyaSA/PyBsb2NhdGlvbi5vcmlnaW4sXHJcbiAgICAgICAgICAgICAgICBhdXRob3JpdHk6IHRoaXMuaW5pdE9wdGlvbnMuYXV0aG9yaXR5LFxyXG4gICAgICAgICAgICAgICAga25vd25BdXRob3JpdGllczogdGhpcy5pbml0T3B0aW9ucy5rbm93bkF1dGhvcml0aWVzLFxyXG4gICAgICAgICAgICAgICAgcHJvdG9jb2xNb2RlOiB0aGlzLmluaXRPcHRpb25zLnByb3RvY29sTW9kZSxcclxuICAgICAgICAgICAgICAgIGNsaWVudENhcGFiaWxpdGllczogdGhpcy5pbml0T3B0aW9ucy5jbGllbnRDYXBhYmlsaXRpZXNcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhY2hlOiAhdGhpcy5pbml0T3B0aW9ucy5jYWNoZUxvY2F0aW9uID8gbnVsbCA6IHtcclxuICAgICAgICAgICAgICAgIGNhY2hlTG9jYXRpb246IHRoaXMuaW5pdE9wdGlvbnMuY2FjaGVMb2NhdGlvblxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IG1zYWwuUHVibGljQ2xpZW50QXBwbGljYXRpb24oY29uZmlnKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFNvY2lhbFVzZXIobG9naW5SZXNwb25zZSk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNvY2lhbFVzZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy9BZnRlciBsb2dpbiwgdXNlIE1pY3Jvc29mdCBHcmFwaCBBUEkgdG8gZ2V0IHVzZXIgaW5mb1xyXG4gICAgICBsZXQgbWVSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgIG1lUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKG1lUmVxdWVzdC5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChtZVJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgIGxldCB1c2VySW5mbyA9IDxNU0dyYXBoVXNlckluZm8+SlNPTi5wYXJzZShtZVJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgbGV0IHVzZXI6IFNvY2lhbFVzZXIgPSBuZXcgU29jaWFsVXNlcigpO1xyXG4gICAgICAgICAgICAgIHVzZXIucHJvdmlkZXIgPSBNaWNyb3NvZnRMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEO1xyXG4gICAgICAgICAgICAgIHVzZXIuaWQgPSBsb2dpblJlc3BvbnNlLmlkVG9rZW47XHJcbiAgICAgICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSBsb2dpblJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xyXG4gICAgICAgICAgICAgIHVzZXIubmFtZSA9IGxvZ2luUmVzcG9uc2UuaWRUb2tlbkNsYWltcy5uYW1lO1xyXG4gICAgICAgICAgICAgIHVzZXIuZW1haWwgPSBsb2dpblJlc3BvbnNlLmFjY291bnQudXNlcm5hbWU7XHJcbiAgICAgICAgICAgICAgdXNlci5pZFRva2VuID0gbG9naW5SZXNwb25zZS5pZFRva2VuO1xyXG4gICAgICAgICAgICAgIHVzZXIucmVzcG9uc2UgPSBsb2dpblJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgIHVzZXIuZmlyc3ROYW1lID0gdXNlckluZm8uZ2l2ZW5OYW1lO1xyXG4gICAgICAgICAgICAgIHVzZXIubGFzdE5hbWUgPSB1c2VySW5mby5zdXJuYW1lO1xyXG5cclxuICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJlamVjdChgRXJyb3IgcmV0cmlldmluZyB1c2VyIGluZm86ICR7bWVSZXF1ZXN0LnN0YXR1c31gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vTWljcm9zb2Z0IEdyYXBoIE1FIEVuZHBvaW50OiBodHRwczovL2RvY3MubWljcm9zb2Z0LmNvbS9lbi11cy9ncmFwaC9hcGkvdXNlci1nZXQ/dmlldz1ncmFwaC1yZXN0LTEuMCZ0YWJzPWh0dHBcclxuICAgICAgbWVSZXF1ZXN0Lm9wZW4oJ0dFVCcsICdodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vdjEuMC9tZScpO1xyXG4gICAgICBtZVJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHtsb2dpblJlc3BvbnNlLmFjY2Vzc1Rva2VufWApO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIG1lUmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldExvZ2luU3RhdHVzKCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgY29uc3QgYWNjb3VudHMgPSB0aGlzLl9pbnN0YW5jZS5nZXRBbGxBY2NvdW50cygpO1xyXG4gICAgaWYgKGFjY291bnRzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGxvZ2luUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9pbnN0YW5jZS5zc29TaWxlbnQoe1xyXG4gICAgICAgIHNjb3BlczogdGhpcy5pbml0T3B0aW9ucy5zY29wZXMsXHJcbiAgICAgICAgbG9naW5IaW50OiBhY2NvdW50c1swXS51c2VybmFtZVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0U29jaWFsVXNlcihsb2dpblJlc3BvbnNlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IGBObyB1c2VyIGlzIGN1cnJlbnRseSBsb2dnZWQgaW4gd2l0aCAke01pY3Jvc29mdExvZ2luUHJvdmlkZXIuUFJPVklERVJfSUR9YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNpZ25JbigpOiBQcm9taXNlPFNvY2lhbFVzZXI+IHtcclxuICAgIGNvbnN0IGxvZ2luUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9pbnN0YW5jZS5sb2dpblBvcHVwKHtcclxuICAgICAgc2NvcGVzOiB0aGlzLmluaXRPcHRpb25zLnNjb3Blc1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRTb2NpYWxVc2VyKGxvZ2luUmVzcG9uc2UpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2lnbk91dChyZXZva2U/OiBib29sZWFuKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IGFjY291bnRzID0gdGhpcy5faW5zdGFuY2UuZ2V0QWxsQWNjb3VudHMoKTtcclxuICAgIGlmIChhY2NvdW50cz8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAvL1RPRE86IFRoaXMgcmVkaXJlY3RzIHRvIGEgTWljcm9zb2Z0IHBhZ2UsIHRoZW4gc2VuZHMgdXMgYmFjayB0byByZWRpcmVjdF91cmkuLi4gdGhpcyBkb2Vzbid0IHNlZW0gdG8gbWF0Y2ggb3RoZXIgcHJvdmlkZXJzXHJcbiAgICAgIC8vT3BlbiBpc3N1ZXM6XHJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hYmFjcml0dC9hbmd1bGFyeC1zb2NpYWwtbG9naW4vaXNzdWVzLzMwNlxyXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vQXp1cmVBRC9taWNyb3NvZnQtYXV0aGVudGljYXRpb24tbGlicmFyeS1mb3ItanMvaXNzdWVzLzI1NjNcclxuICAgICAgYXdhaXQgdGhpcy5faW5zdGFuY2UubG9nb3V0KHtcclxuICAgICAgICBhY2NvdW50OiBhY2NvdW50c1swXSxcclxuICAgICAgICBwb3N0TG9nb3V0UmVkaXJlY3RVcmk6IHRoaXMuaW5pdE9wdGlvbnMubG9nb3V0X3JlZGlyZWN0X3VyaSA/PyB0aGlzLmluaXRPcHRpb25zLnJlZGlyZWN0X3VyaSA/PyBsb2NhdGlvbi5ocmVmXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==