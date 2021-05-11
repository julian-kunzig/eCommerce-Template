import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export class InstagramLoginProvider extends BaseLoginProvider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFncmFtLWxvZ2luLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1NvdXJjZXMvd29ya3NwYWNlcy9pbmZpbm92YWUtZGFzaGJvYXJkL3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJwcm92aWRlcnMvaW5zdGFncmFtLWxvZ2luLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUlyRCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsaUJBQWlCO0lBRzNELFlBQ1UsUUFBZ0IsRUFDaEIsY0FBbUI7UUFDekIsS0FBSyxFQUFFLG9IQUFvSDtRQUMzSCxNQUFNLEVBQUUsT0FBTztRQUNmLE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFLE1BQU07S0FDaEIsRUFDTyxtQkFBd0I7UUFDNUIsTUFBTSxFQUFFLCtCQUErQjtLQUMxQztRQUVELEtBQUssRUFBRSxDQUFDO1FBWEEsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FLbEI7UUFDTyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBRXZCO0lBR0gsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUk7Z0JBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FDWCxzQkFBc0IsQ0FBQyxXQUFXLEVBQ3BDLDBCQUEwQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sU0FBUyxFQUMxRCxHQUFHLEVBQUU7b0JBQ0gsRUFBRSxDQUFDLElBQUksQ0FBQzt3QkFDTixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVE7d0JBQ3BCLGdCQUFnQixFQUFFLElBQUk7d0JBQ3RCLE1BQU0sRUFBRSxJQUFJO3dCQUNaLEtBQUssRUFBRSxJ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LEdBQVcsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUxvZ2luUHJvdmlkZXIgfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4uL2VudGl0aWVzL3NvY2lhbC11c2VyJztcclxuXHJcbmRlY2xhcmUgbGV0IEZCOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5zdGFncmFtTG9naW5Qcm92aWRlciBleHRlbmRzIEJhc2VMb2dpblByb3ZpZGVyIHtcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFBST1ZJREVSX0lEOiBzdHJpbmcgPSAnSU5TVEFHUkFNJztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNsaWVudElkOiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIGluaXRPcHRpb25zOiBhbnkgPSB7XHJcbiAgICAgIHNjb3BlOiAnZW1haWwscHVibGljX3Byb2ZpbGUscmVhZF9pbnNpZ2h0cyxwYWdlc19zaG93X2xpc3QsaW5zdGFncmFtX2Jhc2ljLGluc3RhZ3JhbV9tYW5hZ2VfaW5zaWdodHMscGFnZXNfcmVhZF9lbmdhZ2VtZW50JywgLy8saW5zdGFncmFtX2Jhc2ljLHBhZ2VzX3Nob3dfbGlzdFxyXG4gICAgICBsb2NhbGU6ICdlbl9VUycsXHJcbiAgICAgIGZpZWxkczogJ2lkJyxcclxuICAgICAgdmVyc2lvbjogJ3Y0LjAnLFxyXG4gICAgfSxcclxuICAgIHByaXZhdGUgaW5pdEluc3RhT3B0aW9uczogYW55ID0ge1xyXG4gICAgICAgIGZlaWxkczogJ3VzZXJuYW1lLCBwcm9maWxlX3BpY3R1cmVfdXJsJ1xyXG4gICAgfVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMubG9hZFNjcmlwdChcclxuICAgICAgICAgICAgSW5zdGFncmFtTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRCxcclxuICAgICAgICAgIGAvL2Nvbm5lY3QuZmFjZWJvb2submV0LyR7dGhpcy5pbml0T3B0aW9ucy5sb2NhbGV9L3Nkay5qc2AsXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIEZCLmluaXQoe1xyXG4gICAgICAgICAgICAgIGFwcElkOiB0aGlzLmNsaWVudElkLFxyXG4gICAgICAgICAgICAgIGF1dG9Mb2dBcHBFdmVudHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgY29va2llOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHhmYm1sOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHZlcnNpb246IHRoaXMuaW5pdE9wdGlvbnMudmVyc2lvbixcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TG9naW5TdGF0dXMoKTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBGQi5nZXRMb2dpblN0YXR1cygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09ICdjb25uZWN0ZWQnKSB7XHJcbiAgICAgICAgICBsZXQgYXV0aFJlc3BvbnNlID0gcmVzcG9uc2UuYXV0aFJlc3BvbnNlO1xyXG4gICAgICAgICAgbGV0IHVzZXI6IFNvY2lhbFVzZXIgPSBuZXcgU29jaWFsVXNlcigpO1xyXG4gICAgICAgICAgLy8gdXNlci5yZXNwb25zZSA9IGZiVXNlcjtcclxuICAgICAgICAgIHVzZXIuYXV0aFRva2VuID0gYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xyXG4gICAgICAgICAgRkIuYXBpKGAvbWUvYWNjb3VudHM/IGZpZWxkcz1pbnN0YWdyYW1fYnVzaW5lc3NfYWNjb3VudHtuYW1lLCB1c2VybmFtZSwgaWdfaWQsIHByb2ZpbGVfcGljdHVyZV91cmwsIGZvbGxvd2Vyc19jb3VudCwgbWVkaWFfY291bnQsIG1lZGlhe2NvbW1lbnRzX2NvdW50LCBsaWtlX2NvdW50LCB0aW1lc3RhbXAsIGNvbW1lbnRzLCBtZWRpYV91cmx9fSwgbmFtZSwgbGluaywgcGljdHVyZWAsIChmYlVzZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB1c2VyLnJlc3BvbnNlID0gZmJVc2VyO1xyXG4gICAgICAgICAgICAvLyB1c2VyLmF1dGhUb2tlbiA9IGF1dGhSZXNwb25zZTtcclxuICAgICAgICAgICAgaWYoZmJVc2VyLmRhdGEubGVuZ3RoICE9PSAwKXtcclxuICAgICAgICAgICAgICBsZXQgaTtcclxuICAgICAgICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGZiVXNlci5kYXRhLmxlbmd0aDsgaSArKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZiVXNlci5kYXRhW2ldLmluc3RhZ3JhbV9idXNpbmVzc19hY2NvdW50ICE9IG51bGwgJiYgZmJVc2VyLmRhdGFbaV0uaWQgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB1c2VyLm5hbWUgPSBmYlVzZXIuZGF0YVtpXS5pbnN0YWdyYW1fYnVzaW5lc3NfYWNjb3VudC51c2VybmFtZTsgIC8vIHRvZG9cclxuICAgICAgICAgICAgICAgICAgdXNlci5waG90b1VybCA9IGZiVXNlci5kYXRhW2ldLmluc3RhZ3JhbV9idXNpbmVzc19hY2NvdW50LnByb2ZpbGVfcGljdHVyZV91cmw7ICAvL3RvZG8gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJlamVjdCgnVXNlciBjYW5jZWxsZWQgbG9naW4gb3IgZGlkIG5vdCBmdWxseSBhdXRob3JpemUuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIHJlamVjdCgnVXNlciBjYW5jZWxsZWQgbG9naW4gb3IgZGlkIG5vdCBmdWxseSBhdXRob3JpemUuJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KGBObyB1c2VyIGlzIGN1cnJlbnRseSBsb2dnZWQgaW4gd2l0aCAke0luc3RhZ3JhbUxvZ2luUHJvdmlkZXIuUFJPVklERVJfSUR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2lnbkluKHNpZ25Jbk9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPFNvY2lhbFVzZXI+IHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7IC4uLnRoaXMuaW5pdE9wdGlvbnMsIC4uLnNpZ25Jbk9wdGlvbnMgfTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIEZCLmxvZ2luKChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLmF1dGhSZXNwb25zZSkge1xyXG4gICAgICAgICAgbGV0IGF1dGhSZXNwb25zZSA9IHJlc3BvbnNlLmF1dGhSZXNwb25zZTtcclxuICAgICAgICAgIGxldCB1c2VyOiBTb2NpYWxVc2VyID0gbmV3IFNvY2lhbFVzZXIoKTtcclxuICAgICAgICAgIHVzZXIuYXV0aFRva2VuID0gYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xyXG4gICAgICAgICAgLy8gcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgIEZCLmFwaShgL21lL2FjY291bnRzPyBmaWVsZHM9aW5zdGFncmFtX2J1c2luZXNzX2FjY291bnR7bmFtZSwgdXNlcm5hbWUsIGlnX2lkLCBwcm9maWxlX3BpY3R1cmVfdXJsLCBmb2xsb3dlcnNfY291bnQsIG1lZGlhX2NvdW50LCBtZWRpYXtjb21tZW50c19jb3VudCwgbGlrZV9jb3VudCwgdGltZXN0YW1wLCBjb21tZW50cywgbWVkaWFfdXJsfX0sIG5hbWUsIGxpbmssIHBpY3R1cmVgLCAoZmJVc2VyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdXNlci5yZXNwb25zZSA9IGZiVXNlcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGZiVXNlci5kYXRhLmxlbmd0aCAhPT0gMCl7XHJcbiAgICAgICAgICAgICAgbGV0IGk7XHJcbiAgICAgICAgICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBmYlVzZXIuZGF0YS5sZW5ndGg7IGkgKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChmYlVzZXIuZGF0YVtpXS5pbnN0YWdyYW1fYnVzaW5lc3NfYWNjb3VudCAhPSBudWxsICYmIGZiVXNlci5kYXRhW2ldLmlkICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJlamVjdCgnVXNlciBjYW5jZWxsZWQgbG9naW4gb3IgZGlkIG5vdCBmdWxseSBhdXRob3JpemUuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIHJlamVjdCgnVXNlciBjYW5jZWxsZWQgbG9naW4gb3IgZGlkIG5vdCBmdWxseSBhdXRob3JpemUuJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdCgnVXNlciBjYW5jZWxsZWQgbG9naW4gb3IgZGlkIG5vdCBmdWxseSBhdXRob3JpemUuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCBvcHRpb25zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2lnbk91dCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIEZCLmxvZ291dCgocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19