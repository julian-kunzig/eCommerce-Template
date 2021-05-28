import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export class GoogleLoginProvider extends BaseLoginProvider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxvZ2luLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2FsZXhoL0Rlc2t0b3AvaW5maW5vdmFlL3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJwcm92aWRlcnMvZ29vZ2xlLWxvZ2luLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUlyRCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsaUJBQWlCO0lBS3hELFlBQ1UsUUFBZ0IsRUFDaEIsY0FBbUIsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO1FBRTdDLEtBQUssRUFBRSxDQUFDO1FBSEEsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FBMEI7SUFHL0MsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUk7Z0JBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FDYixtQkFBbUIsQ0FBQyxXQUFXLEVBQy9CLHdDQUF3QyxFQUN4QyxHQUFHLEVBQUU7b0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO3dCQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxpQ0FDdkIsSUFBSSxDQUFDLFdBQVcsS0FDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQ3hCLENBQUM7d0JBRUgsSUFBSSxDQUFDLEtBQUs7NkJBQ1AsSUFBSSxDQUFDLEdBQUcsRUFBRTs0QkFDVCxPQUFPLEVBQUUsQ0FBQzt3QkFDWixDQUFDLENBQUM7NkJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7NEJBQ2xCLE1BQU0sQ0FBQyxHQUFHLENB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LE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQ0Y7aUJBQ0EsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQWdCO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxjQUE0QixDQUFDO1lBRWpDLElBQUksTUFBTSxFQUFFO2dCQUNWLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQzFDO2lCQUFNO2dCQUNMLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3ZDO1lBRUQsY0FBYztpQkFDWCxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNiO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFuSnNCLCtCQUFXLEdBQVcsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUxvZ2luUHJvdmlkZXIgfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4uL2VudGl0aWVzL3NvY2lhbC11c2VyJztcclxuXHJcbmRlY2xhcmUgbGV0IGdhcGk6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVMb2dpblByb3ZpZGVyIGV4dGVuZHMgQmFzZUxvZ2luUHJvdmlkZXIge1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUFJPVklERVJfSUQ6IHN0cmluZyA9ICdHT09HTEUnO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0aDI6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNsaWVudElkOiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIGluaXRPcHRpb25zOiBhbnkgPSB7IHNjb3BlOiAnZW1haWwnIH1cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0aGlzLmxvYWRTY3JpcHQoXHJcbiAgICAgICAgICBHb29nbGVMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lELFxyXG4gICAgICAgICAgJ2h0dHBzOi8vYXBpcy5nb29nbGUuY29tL2pzL3BsYXRmb3JtLmpzJyxcclxuICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgZ2FwaS5sb2FkKCdhdXRoMicsICgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmF1dGgyID0gZ2FwaS5hdXRoMi5pbml0KHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuaW5pdE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuYXV0aDJcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TG9naW5TdGF0dXMobG9naW5TdGF0dXNPcHRpb25zPzogYW55KTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gey4uLnRoaXMuaW5pdE9wdGlvbnMsIC4uLmxvZ2luU3RhdHVzT3B0aW9uc307XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHRoaXMuYXV0aDIuaXNTaWduZWRJbi5nZXQoKSkge1xyXG4gICAgICAgIGxldCB1c2VyOiBTb2NpYWxVc2VyID0gbmV3IFNvY2lhbFVzZXIoKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvZmlsZSA9IHRoaXMuYXV0aDIuY3VycmVudFVzZXIuZ2V0KCkuZ2V0QmFzaWNQcm9maWxlKCk7XHJcbiAgICAgICAgdXNlci5pZCA9IHByb2ZpbGUuZ2V0SWQoKTtcclxuICAgICAgICB1c2VyLm5hbWUgPSBwcm9maWxlLmdldE5hbWUoKTtcclxuICAgICAgICB1c2VyLmVtYWlsID0gcHJvZmlsZS5nZXRFbWFpbCgpO1xyXG4gICAgICAgIHVzZXIucGhvdG9VcmwgPSBwcm9maWxlLmdldEltYWdlVXJsKCk7XHJcbiAgICAgICAgdXNlci5maXJzdE5hbWUgPSBwcm9maWxlLmdldEdpdmVuTmFtZSgpO1xyXG4gICAgICAgIHVzZXIubGFzdE5hbWUgPSBwcm9maWxlLmdldEZhbWlseU5hbWUoKTtcclxuICAgICAgICB1c2VyLnJlc3BvbnNlID0gcHJvZmlsZTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZVVzZXIgPSBhdXRoUmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSBhdXRoUmVzcG9uc2UuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgICAgdXNlci5pZFRva2VuID0gYXV0aFJlc3BvbnNlLmlkX3Rva2VuO1xyXG5cclxuICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMucmVmcmVzaFRva2VuKSB7XHJcbiAgICAgICAgICB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyLmdldCgpLnJlbG9hZEF1dGhSZXNwb25zZSgpLnRoZW4ocmVzb2x2ZVVzZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBhdXRoUmVzcG9uc2UgPSB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyLmdldCgpLmdldEF1dGhSZXNwb25zZSh0cnVlKTtcclxuICAgICAgICAgIHJlc29sdmVVc2VyKGF1dGhSZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdChcclxuICAgICAgICAgIGBObyB1c2VyIGlzIGN1cnJlbnRseSBsb2dnZWQgaW4gd2l0aCAke0dvb2dsZUxvZ2luUHJvdmlkZXIuUFJPVklERVJfSUR9YFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2lnbkluKHNpZ25Jbk9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPFNvY2lhbFVzZXI+IHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7IC4uLnRoaXMuaW5pdE9wdGlvbnMsIC4uLnNpZ25Jbk9wdGlvbnMgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBvZmZsaW5lQWNjZXNzOiBib29sZWFuID0gb3B0aW9ucyAmJiBvcHRpb25zLm9mZmxpbmVfYWNjZXNzO1xyXG4gICAgICBsZXQgcHJvbWlzZSA9ICFvZmZsaW5lQWNjZXNzXHJcbiAgICAgICAgPyB0aGlzLmF1dGgyLnNpZ25JbihzaWduSW5PcHRpb25zKVxyXG4gICAgICAgIDogdGhpcy5hdXRoMi5ncmFudE9mZmxpbmVBY2Nlc3Moc2lnbkluT3B0aW9ucyk7XHJcblxyXG4gICAgICBwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXNlcjogU29jaWFsVXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuY29kZSkge1xyXG4gICAgICAgICAgICAgIHVzZXIuYXV0aG9yaXphdGlvbkNvZGUgPSByZXNwb25zZS5jb2RlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGxldCBwcm9maWxlID0gdGhpcy5hdXRoMi5jdXJyZW50VXNlci5nZXQoKS5nZXRCYXNpY1Byb2ZpbGUoKTtcclxuICAgICAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyLmdldCgpLmdldEF1dGhSZXNwb25zZSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgLmFjY2Vzc190b2tlbjtcclxuICAgICAgICAgICAgICBsZXQgYmFja2VuZFRva2VuID0gdGhpcy5hdXRoMi5jdXJyZW50VXNlclxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0QXV0aFJlc3BvbnNlKHRydWUpLmlkX3Rva2VuO1xyXG5cclxuICAgICAgICAgICAgICB1c2VyLmlkID0gcHJvZmlsZS5nZXRJZCgpO1xyXG4gICAgICAgICAgICAgIHVzZXIubmFtZSA9IHByb2ZpbGUuZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICAgIHVzZXIuZW1haWwgPSBwcm9maWxlLmdldEVtYWlsKCk7XHJcbiAgICAgICAgICAgICAgdXNlci5waG90b1VybCA9IHByb2ZpbGUuZ2V0SW1hZ2VVcmwoKTtcclxuICAgICAgICAgICAgICB1c2VyLmZpcnN0TmFtZSA9IHByb2ZpbGUuZ2V0R2l2ZW5OYW1lKCk7XHJcbiAgICAgICAgICAgICAgdXNlci5sYXN0TmFtZSA9IHByb2ZpbGUuZ2V0RmFtaWx5TmFtZSgpO1xyXG4gICAgICAgICAgICAgIHVzZXIuYXV0aFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgdXNlci5pZFRva2VuID0gYmFja2VuZFRva2VuO1xyXG5cclxuICAgICAgICAgICAgICB1c2VyLnJlc3BvbnNlID0gcHJvZmlsZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoY2xvc2VkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KGNsb3NlZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaWduT3V0KHJldm9rZT86IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCBzaWduT3V0UHJvbWlzZTogUHJvbWlzZTxhbnk+O1xyXG5cclxuICAgICAgaWYgKHJldm9rZSkge1xyXG4gICAgICAgIHNpZ25PdXRQcm9taXNlID0gdGhpcy5hdXRoMi5kaXNjb25uZWN0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2lnbk91dFByb21pc2UgPSB0aGlzLmF1dGgyLnNpZ25PdXQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2lnbk91dFByb21pc2VcclxuICAgICAgICAudGhlbigoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycjogYW55KSA9PiB7XHJcbiAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=