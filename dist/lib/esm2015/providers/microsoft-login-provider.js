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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm9zb2Z0LWxvZ2luLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1NvdXJjZXMvd29ya3NwYWNlcy9pbmZpbm92YWUtZGFzaGJvYXJkL3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJwcm92aWRlcnMvbWljcm9zb2Z0LWxvZ2luLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFckQ7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxZQUdYO0FBSEQsV0FBWSxZQUFZO0lBQ3RCLDJCQUFXLENBQUE7SUFDWCw2QkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhXLFlBQVksS0FBWixZQUFZLFFBR3ZCO0FBZ0ZELE1BQU0sZ0JBQWdCLEdBQVcsMkNBQTJDLENBQUM7QUFFN0U7O0dBRUc7QUFDSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsaUJBQWlCO0lBYTNELFlBQ1UsUUFBZ0IsRUFDeEIsV0FBOEI7UUFFOUIsS0FBSyxFQUFFLENBQUM7UUFIQSxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBVmxCLGdCQUFXLEdBQXFCO1lBQ3RDLFNBQVMsRUFBRSxnQkFBZ0I7WUFDM0IsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDO1lBQ25ELGdCQUFnQixFQUFFLEVBQUU7WUFDcEIsWUFBWSxFQUFFLFlBQVksQ0FBQyxHQUFHO1lBQzlCLGtCQUFrQixFQUFFLEVBQUU7WUFDdEIsYUFBYSxFQUFFLGdCQUFnQjtTQUNoQyxDQUFDO1FBUUEsSUFBSSxDQUFDLFdBQVcsbUNBQ1gsSUFBSSxDQUFDLFdBQVcsR0FDaEIsV0FBVyxDQUNmLENBQUM7SUFDSixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFP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QUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ2pELElBQUksQ0FBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsTUFBTSxJQUFHLENBQUMsRUFBRTtnQkFDeEIsNEhBQTRIO2dCQUM1SCxjQUFjO2dCQUNkLCtEQUErRDtnQkFDL0QsaUZBQWlGO2dCQUNqRixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO29CQUMxQixPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDcEIscUJBQXFCLGNBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsbUNBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLG1DQUFJLFFBQVEsQ0FBQyxJQUFJO2lCQUM5RyxDQUFDLENBQUE7YUFDSDs7S0FDRjs7QUFoSXNCLGtDQUFXLEdBQVcsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUxvZ2luUHJvdmlkZXIgfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcbmltcG9ydCB7IFNvY2lhbFVzZXIgfSBmcm9tICcuLi9lbnRpdGllcy9zb2NpYWwtdXNlcic7XG5cbi8qKlxuICogUHJvdG9jb2wgbW9kZXMgc3VwcG9ydGVkIGJ5IE1TQUwuXG4gKi9cbmV4cG9ydCBlbnVtIFByb3RvY29sTW9kZSB7XG4gIEFBRCA9ICdBQUQnLFxuICBPSURDID0gJ09JREMnXG59XG5cbi8qKlxuICogSW5pdGlhbGl6YXRpb24gT3B0aW9ucyBmb3IgTWljcm9zb2Z0IFByb3ZpZGVyOiBodHRwczovL2dpdGh1Yi5jb20vQXp1cmVBRC9taWNyb3NvZnQtYXV0aGVudGljYXRpb24tbGlicmFyeS1mb3ItanMvYmxvYi9kZXYvbGliL21zYWwtYnJvd3Nlci9kb2NzL2luaXRpYWxpemF0aW9uLm1kXG4gKiBEZXRhaWxzIChub3QgYWxsIG9wdGlvbnMgYXJlIHN1cHBvcnRlZCk6IGh0dHBzOi8vZ2l0aHViLmNvbS9BenVyZUFEL21pY3Jvc29mdC1hdXRoZW50aWNhdGlvbi1saWJyYXJ5LWZvci1qcy9ibG9iL2Rldi9saWIvbXNhbC1icm93c2VyL2RvY3MvY29uZmlndXJhdGlvbi5tZFxuICovXG5leHBvcnQgdHlwZSBNaWNyb3NvZnRPcHRpb25zID0ge1xuICByZWRpcmVjdF91cmk/OiBzdHJpbmcsXG4gIGxvZ291dF9yZWRpcmVjdF91cmk/OiBzdHJpbmcsXG4gIGF1dGhvcml0eT86IHN0cmluZyxcbiAga25vd25BdXRob3JpdGllcz86IHN0cmluZ1tdLFxuICBwcm90b2NvbE1vZGU/OiBQcm90b2NvbE1vZGUsXG4gIGNsaWVudENhcGFiaWxpdGllcz86IHN0cmluZ1tdLFxuICBjYWNoZUxvY2F0aW9uPzogc3RyaW5nLFxuICBzY29wZXM/OiBzdHJpbmdbXVxufTtcblxuLy8gQ29sbGVjdGlvbiBvZiBpbnRlcm5hbCBNU0FMIGludGVyZmFjZXMgZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL0F6dXJlQUQvbWljcm9zb2Z0LWF1dGhlbnRpY2F0aW9uLWxpYnJhcnktZm9yLWpzL3RyZWUvZGV2L2xpYi9tc2FsLWJyb3dzZXIvc3JjXG5cbmludGVyZmFjZSBNU0FMQWNjb3VudCB7XG4gIGVudmlyb25tZW50OiBzdHJpbmc7XG4gIGhvbWVBY2NvdW50SWQ6IHN0cmluZztcbiAgdGVuYW50SWQ6IHN0cmluZztcbiAgdXNlcm5hbWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIE1TR3JhcGhVc2VySW5mbyB7XG4gIGJ1c2luZXNzUGhvbmVzOiBzdHJpbmdbXTtcbiAgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgZ2l2ZW5OYW1lOiBzdHJpbmc7XG4gIGlkOiBzdHJpbmc7XG4gIGpvYlRpdGxlOiBzdHJpbmc7XG4gIG1haWw6IHN0cmluZztcbiAgbW9iaWxlUGhvbmU6IHN0cmluZztcbiAgb2ZmaWNlTG9jYXRpb246IHN0cmluZztcbiAgcHJlZmVycmVkTGFuZ3VhZ2U6IHN0cmluZztcbiAgc3VybmFtZTogc3RyaW5nO1xuICB1c2VyUHJpbmNpcGFsTmFtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTVNBTExvZ2luUmVxdWVzdCB7XG4gIHNjb3Blcz86IHN0cmluZ1tdO1xuICBzaWQ/OiBzdHJpbmc7XG4gIGxvZ2luSGludD86IHN0cmluZztcbiAgZG9tYWluSGludD86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIE1TQUxMb2dpblJlc3BvbnNlIHtcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcbiAgYWNjb3VudDogTVNBTEFjY291bnQ7XG4gIGV4cGlyZXNPbjogRGF0ZTtcbiAgZXh0RXhwaXJlc09uOiBEYXRlO1xuICBmYW1pbHlJZDogc3RyaW5nO1xuICBmcm9tQ2FjaGU6IGJvb2xlYW47XG4gIGlkVG9rZW46IHN0cmluZztcbiAgaWRUb2tlbkNsYWltczogYW55O1xuICBzY29wZXM6IHN0cmluZ1tdO1xuICBzdGF0ZTogc3RyaW5nO1xuICB0ZW5hbnRJZDogc3RyaW5nO1xuICB1bmlxdWVJZDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTVNBTExvZ291dFJlcXVlc3Qge1xuICBhY2NvdW50PzogTVNBTEFjY291bnQ7XG4gIHBvc3RMb2dvdXRSZWRpcmVjdFVyaT86IHN0cmluZztcbiAgYXV0aG9yaXR5Pzogc3RyaW5nO1xuICBjb3JyZWxhdGlvbklkPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTVNBTENsaWVudEFwcGxpY2F0aW9uIHtcbiAgZ2V0QWxsQWNjb3VudHMoKTogTVNBTEFjY291bnRbXTtcbiAgbG9nb3V0KGxvZ291dFJlcXVlc3Q/OiBNU0FMTG9nb3V0UmVxdWVzdCk6IFByb21pc2U8dm9pZD47XG4gIGxvZ2luUG9wdXAobG9naW5SZXF1ZXN0OiBNU0FMTG9naW5SZXF1ZXN0KTogUHJvbWlzZTxNU0FMTG9naW5SZXNwb25zZT47XG4gIHNzb1NpbGVudChsb2dpblJlcXVlc3Q6IE1TQUxMb2dpblJlcXVlc3QpOiBQcm9taXNlPE1TQUxMb2dpblJlc3BvbnNlPjtcbiAgYWNxdWlyZVRva2VuU2lsZW50KGxvZ2luUmVxdWVzdDogTVNBTExvZ2luUmVxdWVzdCk6IFByb21pc2U8TVNBTExvZ2luUmVzcG9uc2U+O1xuICBnZXRBY2NvdW50QnlIb21lSWQoaG9tZUFjY291bnRJZDogc3RyaW5nKTogTVNBTEFjY291bnQ7XG59XG5cbmRlY2xhcmUgbGV0IG1zYWw6IGFueTtcblxuY29uc3QgQ09NTU9OX0FVVEhPUklUWTogc3RyaW5nID0gJ2h0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9jb21tb24vJztcblxuLyoqXG4gKiBNaWNyb3NvZnQgQXV0aGVudGljYXRpb24gdXNpbmcgTVNBTCB2MjogaHR0cHM6Ly9naXRodWIuY29tL0F6dXJlQUQvbWljcm9zb2Z0LWF1dGhlbnRpY2F0aW9uLWxpYnJhcnktZm9yLWpzL3RyZWUvZGV2L2xpYi9tc2FsLWJyb3dzZXJcbiAqL1xuZXhwb3J0IGNsYXNzIE1pY3Jvc29mdExvZ2luUHJvdmlkZXIgZXh0ZW5kcyBCYXNlTG9naW5Qcm92aWRlciB7XG4gIHByaXZhdGUgX2luc3RhbmNlOiBNU0FMQ2xpZW50QXBwbGljYXRpb247XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUFJPVklERVJfSUQ6IHN0cmluZyA9ICdNSUNST1NPRlQnO1xuXG4gIHByaXZhdGUgaW5pdE9wdGlvbnM6IE1pY3Jvc29mdE9wdGlvbnMgPSB7XG4gICAgYXV0aG9yaXR5OiBDT01NT05fQVVUSE9SSVRZLFxuICAgIHNjb3BlczogWydvcGVuaWQnLCAnZW1haWwnLCAncHJvZmlsZScsICdVc2VyLlJlYWQnXSxcbiAgICBrbm93bkF1dGhvcml0aWVzOiBbXSxcbiAgICBwcm90b2NvbE1vZGU6IFByb3RvY29sTW9kZS5BQUQsXG4gICAgY2xpZW50Q2FwYWJpbGl0aWVzOiBbXSxcbiAgICBjYWNoZUxvY2F0aW9uOiAnc2Vzc2lvblN0b3JhZ2UnXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjbGllbnRJZDogc3RyaW5nLFxuICAgIGluaXRPcHRpb25zPzogTWljcm9zb2Z0T3B0aW9uc1xuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbml0T3B0aW9ucyA9IHtcbiAgICAgIC4uLnRoaXMuaW5pdE9wdGlvbnMsXG4gICAgICAuLi5pbml0T3B0aW9uc1xuICAgIH07XG4gIH1cblxuICBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvYWRTY3JpcHQoXG4gICAgICAgIE1pY3Jvc29mdExvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQsXG4gICAgICAgICdodHRwczovL2FsY2RuLm1zYXV0aC5uZXQvYnJvd3Nlci8yLjEuMC9qcy9tc2FsLWJyb3dzZXIuanMnLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgYXV0aDoge1xuICAgICAgICAgICAgICAgIGNsaWVudElkOiB0aGlzLmNsaWVudElkLFxuICAgICAgICAgICAgICAgIHJlZGlyZWN0VXJpOiB0aGlzLmluaXRPcHRpb25zLnJlZGlyZWN0X3VyaSA/PyBsb2NhdGlvbi5vcmlnaW4sXG4gICAgICAgICAgICAgICAgYXV0aG9yaXR5OiB0aGlzLmluaXRPcHRpb25zLmF1dGhvcml0eSxcbiAgICAgICAgICAgICAgICBrbm93bkF1dGhvcml0aWVzOiB0aGlzLmluaXRPcHRpb25zLmtub3duQXV0aG9yaXRpZXMsXG4gICAgICAgICAgICAgICAgcHJvdG9jb2xNb2RlOiB0aGlzLmluaXRPcHRpb25zLnByb3RvY29sTW9kZSxcbiAgICAgICAgICAgICAgICBjbGllbnRDYXBhYmlsaXRpZXM6IHRoaXMuaW5pdE9wdGlvbnMuY2xpZW50Q2FwYWJpbGl0aWVzXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNhY2hlOiAhdGhpcy5pbml0T3B0aW9ucy5jYWNoZUxvY2F0aW9uID8gbnVsbCA6IHtcbiAgICAgICAgICAgICAgICBjYWNoZUxvY2F0aW9uOiB0aGlzLmluaXRPcHRpb25zLmNhY2hlTG9jYXRpb25cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgbXNhbC5QdWJsaWNDbGllbnRBcHBsaWNhdGlvbihjb25maWcpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFNvY2lhbFVzZXIobG9naW5SZXNwb25zZSk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTb2NpYWxVc2VyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvL0FmdGVyIGxvZ2luLCB1c2UgTWljcm9zb2Z0IEdyYXBoIEFQSSB0byBnZXQgdXNlciBpbmZvXG4gICAgICBsZXQgbWVSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICBtZVJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBpZiAobWVSZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobWVSZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0gPE1TR3JhcGhVc2VySW5mbz5KU09OLnBhcnNlKG1lUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgICAgICAgIGxldCB1c2VyOiBTb2NpYWxVc2VyID0gbmV3IFNvY2lhbFVzZXIoKTtcbiAgICAgICAgICAgICAgdXNlci5wcm92aWRlciA9IE1pY3Jvc29mdExvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQ7XG4gICAgICAgICAgICAgIHVzZXIuaWQgPSBsb2dpblJlc3BvbnNlLmlkVG9rZW47XG4gICAgICAgICAgICAgIHVzZXIuYXV0aFRva2VuID0gbG9naW5SZXNwb25zZS5hY2Nlc3NUb2tlbjtcbiAgICAgICAgICAgICAgdXNlci5uYW1lID0gbG9naW5SZXNwb25zZS5pZFRva2VuQ2xhaW1zLm5hbWU7XG4gICAgICAgICAgICAgIHVzZXIuZW1haWwgPSBsb2dpblJlc3BvbnNlLmFjY291bnQudXNlcm5hbWU7XG4gICAgICAgICAgICAgIHVzZXIuaWRUb2tlbiA9IGxvZ2luUmVzcG9uc2UuaWRUb2tlbjtcbiAgICAgICAgICAgICAgdXNlci5yZXNwb25zZSA9IGxvZ2luUmVzcG9uc2U7XG4gICAgICAgICAgICAgIHVzZXIuZmlyc3ROYW1lID0gdXNlckluZm8uZ2l2ZW5OYW1lO1xuICAgICAgICAgICAgICB1c2VyLmxhc3ROYW1lID0gdXNlckluZm8uc3VybmFtZTtcblxuICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGBFcnJvciByZXRyaWV2aW5nIHVzZXIgaW5mbzogJHttZVJlcXVlc3Quc3RhdHVzfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvL01pY3Jvc29mdCBHcmFwaCBNRSBFbmRwb2ludDogaHR0cHM6Ly9kb2NzLm1pY3Jvc29mdC5jb20vZW4tdXMvZ3JhcGgvYXBpL3VzZXItZ2V0P3ZpZXc9Z3JhcGgtcmVzdC0xLjAmdGFicz1odHRwXG4gICAgICBtZVJlcXVlc3Qub3BlbignR0VUJywgJ2h0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS92MS4wL21lJyk7XG4gICAgICBtZVJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHtsb2dpblJlc3BvbnNlLmFjY2Vzc1Rva2VufWApO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbWVSZXF1ZXN0LnNlbmQoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGdldExvZ2luU3RhdHVzKCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xuICAgIGNvbnN0IGFjY291bnRzID0gdGhpcy5faW5zdGFuY2UuZ2V0QWxsQWNjb3VudHMoKTtcbiAgICBpZiAoYWNjb3VudHM/Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGxvZ2luUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9pbnN0YW5jZS5zc29TaWxlbnQoe1xuICAgICAgICBzY29wZXM6IHRoaXMuaW5pdE9wdGlvbnMuc2NvcGVzLFxuICAgICAgICBsb2dpbkhpbnQ6IGFjY291bnRzWzBdLnVzZXJuYW1lXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldFNvY2lhbFVzZXIobG9naW5SZXNwb25zZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGBObyB1c2VyIGlzIGN1cnJlbnRseSBsb2dnZWQgaW4gd2l0aCAke01pY3Jvc29mdExvZ2luUHJvdmlkZXIuUFJPVklERVJfSUR9YDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzaWduSW4oKTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XG4gICAgY29uc3QgbG9naW5SZXNwb25zZSA9IGF3YWl0IHRoaXMuX2luc3RhbmNlLmxvZ2luUG9wdXAoe1xuICAgICAgc2NvcGVzOiB0aGlzLmluaXRPcHRpb25zLnNjb3Blc1xuICAgIH0pO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmdldFNvY2lhbFVzZXIobG9naW5SZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBzaWduT3V0KHJldm9rZT86IGJvb2xlYW4pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGFjY291bnRzID0gdGhpcy5faW5zdGFuY2UuZ2V0QWxsQWNjb3VudHMoKTtcbiAgICBpZiAoYWNjb3VudHM/Lmxlbmd0aCA+IDApIHtcbiAgICAgIC8vVE9ETzogVGhpcyByZWRpcmVjdHMgdG8gYSBNaWNyb3NvZnQgcGFnZSwgdGhlbiBzZW5kcyB1cyBiYWNrIHRvIHJlZGlyZWN0X3VyaS4uLiB0aGlzIGRvZXNuJ3Qgc2VlbSB0byBtYXRjaCBvdGhlciBwcm92aWRlcnNcbiAgICAgIC8vT3BlbiBpc3N1ZXM6XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYWJhY3JpdHQvYW5ndWxhcngtc29jaWFsLWxvZ2luL2lzc3Vlcy8zMDZcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9BenVyZUFEL21pY3Jvc29mdC1hdXRoZW50aWNhdGlvbi1saWJyYXJ5LWZvci1qcy9pc3N1ZXMvMjU2M1xuICAgICAgYXdhaXQgdGhpcy5faW5zdGFuY2UubG9nb3V0KHtcbiAgICAgICAgYWNjb3VudDogYWNjb3VudHNbMF0sXG4gICAgICAgIHBvc3RMb2dvdXRSZWRpcmVjdFVyaTogdGhpcy5pbml0T3B0aW9ucy5sb2dvdXRfcmVkaXJlY3RfdXJpID8/IHRoaXMuaW5pdE9wdGlvbnMucmVkaXJlY3RfdXJpID8/IGxvY2F0aW9uLmhyZWZcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=