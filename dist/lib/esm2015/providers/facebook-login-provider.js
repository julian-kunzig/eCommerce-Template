import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export class FacebookLoginProvider extends BaseLoginProvider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2stbG9naW4tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvYWxleGgvRGVza3RvcC9pbmZpbm92YWUvcHJvamVjdHMvbGliL3NyYy8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9mYWNlYm9vay1sb2dpbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFJckQsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGlCQUFpQjtJQUcxRCxZQUNVLFFBQWdCLEVBQ2hCLGNBQW1CO1FBQ3pCLHlEQUF5RDtRQUN6RCxLQUFLLEVBQUUsOENBQThDO1FBQ3JELE1BQU0sRUFBRSxPQUFPO1FBQ2YsTUFBTSxFQUFFLDZIQUE2SDtRQUNySSxPQUFPLEVBQUUsTUFBTTtLQUNoQjtRQUVELEtBQUssRUFBRSxDQUFDO1FBVEEsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FNbEI7SUFHSCxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSTtnQkFDRixJQUFJLENBQUMsVUFBVSxDQUNiLHFCQUFxQixDQUFDLFdBQVcsRUFDakMsMEJBQTBCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxTQUFTLEVBQzFELEdBQUcsRUFBRTtvQkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDO3dCQUNOLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUTt3QkFDcEIsZ0JBQWdCLEVBQUUsSUFBSTt3QkFDdEIsTUFBTSxFQUFFLElBQUk7d0JBQ1osS0FBSyxFQUFFLElBQUk7d0JBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTztxQkFDbEMsQ0FBQyxDQUFDO29CQUVILE9BQU8s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R0FBRyxDQUFDO3dCQUN0QyxrQ0FBa0M7d0JBQ2xDLGNBQWM7d0JBQ2QsMEJBQTBCO3dCQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQzt3QkFDakMsNkNBQTZDO3dCQUU3QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztvQkFHekIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO2lCQUM1RDtZQUNILENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFsSHNCLGlDQUFXLEdBQVcsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUxvZ2luUHJvdmlkZXIgfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4uL2VudGl0aWVzL3NvY2lhbC11c2VyJztcclxuXHJcbmRlY2xhcmUgbGV0IEZCOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgRmFjZWJvb2tMb2dpblByb3ZpZGVyIGV4dGVuZHMgQmFzZUxvZ2luUHJvdmlkZXIge1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUFJPVklERVJfSUQ6IHN0cmluZyA9ICdGQUNFQk9PSyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjbGllbnRJZDogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBpbml0T3B0aW9uczogYW55ID0ge1xyXG4gICAgICAvLyBzY29wZTogJ2VtYWlsLHB1YmxpY19wcm9maWxlLHVzZXJfZnJpZW5kcyx1c2VyX3Bvc3RzJyxcclxuICAgICAgc2NvcGU6ICdlbWFpbCxwdWJsaWNfcHJvZmlsZSx1c2VyX2ZyaWVuZHMsdXNlcl9wb3N0cycsXHJcbiAgICAgIGxvY2FsZTogJ2VuX1VTJyxcclxuICAgICAgZmllbGRzOiAnbmFtZSxlbWFpbCxwaWN0dXJlLGZpcnN0X25hbWUsbGFzdF9uYW1lLGZyaWVuZHN7c3VtbWFyeXt0b3RhbF9jb3VudH19LHBvc3Rze2Z1bGxfcGljdHVyZSxjcmVhdGVkX3RpbWUsIGNvbW1lbnRzLCByZWFjdGlvbnN9JyxcclxuICAgICAgdmVyc2lvbjogJ3Y0LjAnLFxyXG4gICAgfVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMubG9hZFNjcmlwdChcclxuICAgICAgICAgIEZhY2Vib29rTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRCxcclxuICAgICAgICAgIGAvL2Nvbm5lY3QuZmFjZWJvb2submV0LyR7dGhpcy5pbml0T3B0aW9ucy5sb2NhbGV9L3Nkay5qc2AsXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIEZCLmluaXQoe1xyXG4gICAgICAgICAgICAgIGFwcElkOiB0aGlzLmNsaWVudElkLFxyXG4gICAgICAgICAgICAgIGF1dG9Mb2dBcHBFdmVudHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgY29va2llOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHhmYm1sOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHZlcnNpb246IHRoaXMuaW5pdE9wdGlvbnMudmVyc2lvbixcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TG9naW5TdGF0dXMoKTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBGQi5nZXRMb2dpblN0YXR1cygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09ICdjb25uZWN0ZWQnKSB7XHJcbiAgICAgICAgICBsZXQgdXNlcjogU29jaWFsVXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XHJcbiAgICAgICAgICBsZXQgYXV0aFJlc3BvbnNlID0gcmVzcG9uc2UuYXV0aFJlc3BvbnNlO1xyXG4gICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSBhdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW47XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIEZCLmFwaShgL21lP2ZpZWxkcz0ke3RoaXMuaW5pdE9wdGlvbnMuZmllbGRzfWAsIChmYlVzZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXNlcjogU29jaWFsVXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XHJcblxyXG4gICAgICAgICAgICB1c2VyLmlkID0gZmJVc2VyLmlkO1xyXG4gICAgICAgICAgICB1c2VyLm5hbWUgPSBmYlVzZXIubmFtZTtcclxuICAgICAgICAgICAgdXNlci5lbWFpbCA9IGZiVXNlci5lbWFpbDtcclxuICAgICAgICAgICAgdXNlci5waG90b1VybCA9IGZiVXNlci5waWN0dXJlLmRhdGEudXJsO1xyXG4gICAgICAgICAgICAgIC8vICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8nICtcclxuICAgICAgICAgICAgICAvLyBmYlVzZXIuaWQgK1xyXG4gICAgICAgICAgICAgIC8vICcvcGljdHVyZT90eXBlPW5vcm1hbCc7XHJcbiAgICAgICAgICAgIHVzZXIuZmlyc3ROYW1lID0gZmJVc2VyLmZpcnN0X25hbWU7XHJcbiAgICAgICAgICAgIHVzZXIubGFzdE5hbWUgPSBmYlVzZXIubGFzdF9uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHVzZXIucmVzcG9uc2UgPSBmYlVzZXI7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KGBObyB1c2VyIGlzIGN1cnJlbnRseSBsb2dnZWQgaW4gd2l0aCAke0ZhY2Vib29rTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaWduSW4oc2lnbkluT3B0aW9ucz86IGFueSk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgLi4udGhpcy5pbml0T3B0aW9ucywgLi4uc2lnbkluT3B0aW9ucyB9O1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgRkIubG9naW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2UuYXV0aFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBsZXQgdXNlcjogU29jaWFsVXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XHJcbiAgICAgICAgICBsZXQgYXV0aFJlc3BvbnNlID0gcmVzcG9uc2UuYXV0aFJlc3BvbnNlO1xyXG4gICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSBhdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW47XHJcbiAgICAgICAgICAvLyByZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2FjY2Vzc190b2tlbiA9ICcsdXNlci5hdXRoVG9rZW4pO1xyXG4gICAgICAgICAgRkIuYXBpKGAvbWU/ZmllbGRzPSR7b3B0aW9ucy5maWVsZHN9YCwgKGZiVXNlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEZCLmFwaShgL21lL3Blcm1pc3Npb25zPSR7b3B0aW9ucy5maWVsZHN9YCwgKGZiVXNlcjogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICB1c2VyLmlkID0gZmJVc2VyLmlkO1xyXG4gICAgICAgICAgICB1c2VyLm5hbWUgPSBmYlVzZXIubmFtZTtcclxuICAgICAgICAgICAgdXNlci5lbWFpbCA9IGZiVXNlci5lbWFpbDtcclxuICAgICAgICAgICAgdXNlci5waG90b1VybCA9IGZiVXNlci5waWN0dXJlLmRhdGEudXJsO1xyXG4gICAgICAgICAgICAgIC8vICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8nICtcclxuICAgICAgICAgICAgICAvLyBmYlVzZXIuaWQgK1xyXG4gICAgICAgICAgICAgIC8vICcvcGljdHVyZT90eXBlPW5vcm1hbCc7XHJcbiAgICAgICAgICAgIHVzZXIuZmlyc3ROYW1lID0gZmJVc2VyLmZpcnN0X25hbWU7XHJcbiAgICAgICAgICAgIHVzZXIubGFzdE5hbWUgPSBmYlVzZXIubGFzdF9uYW1lO1xyXG4gICAgICAgICAgICAvLyB1c2VyLmF1dGhUb2tlbiA9IGF1dGhSZXNwb25zZS5hY2Nlc3NUb2tlbjtcclxuXHJcbiAgICAgICAgICAgIHVzZXIucmVzcG9uc2UgPSBmYlVzZXI7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KCdVc2VyIGNhbmNlbGxlZCBsb2dpbiBvciBkaWQgbm90IGZ1bGx5IGF1dGhvcml6ZS4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaWduT3V0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgRkIubG9nb3V0KChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=