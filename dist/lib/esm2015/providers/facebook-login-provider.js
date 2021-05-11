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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2stbG9naW4tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvU291cmNlcy93b3Jrc3BhY2VzL2luZmlub3ZhZS1kYXNoYm9hcmQvcHJvamVjdHMvbGliL3NyYy8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9mYWNlYm9vay1sb2dpbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFJckQsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGlCQUFpQjtJQUcxRCxZQUNVLFFBQWdCLEVBQ2hCLGNBQW1CO1FBQ3pCLHlEQUF5RDtRQUN6RCxLQUFLLEVBQUUsOENBQThDO1FBQ3JELE1BQU0sRUFBRSxPQUFPO1FBQ2YsTUFBTSxFQUFFLDZIQUE2SDtRQUNySSxPQUFPLEVBQUUsTUFBTTtLQUNoQjtRQUVELEtBQUssRUFBRSxDQUFDO1FBVEEsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FNbEI7SUFHSCxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSTtnQkFDRixJQUFJLENBQUMsVUFBVSxDQUNiLHFCQUFxQixDQUFDLFdBQVcsRUFDakMsMEJBQTBCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxTQUFTLEVBQzFELEdBQUcsRUFBRTtvQkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDO3dCQUNOLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUTt3QkFDcEIsZ0JBQWdCLEVBQUUsSUFBSTt3QkFDdEIsTUFBTSxFQUFFLElBQUk7d0JBQ1osS0FBSyxFQUFFLElBQUk7d0JBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTztxQkFDbEMsQ0FBQyxD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Q0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3dCQUN0QyxrQ0FBa0M7d0JBQ2xDLGNBQWM7d0JBQ2QsMEJBQTBCO3dCQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQzt3QkFDakMsNkNBQTZDO3dCQUU3QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztvQkFHekIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO2lCQUM1RDtZQUNILENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFsSHNCLGlDQUFXLEdBQVcsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUxvZ2luUHJvdmlkZXIgfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcbmltcG9ydCB7IFNvY2lhbFVzZXIgfSBmcm9tICcuLi9lbnRpdGllcy9zb2NpYWwtdXNlcic7XG5cbmRlY2xhcmUgbGV0IEZCOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBGYWNlYm9va0xvZ2luUHJvdmlkZXIgZXh0ZW5kcyBCYXNlTG9naW5Qcm92aWRlciB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUFJPVklERVJfSUQ6IHN0cmluZyA9ICdGQUNFQk9PSyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjbGllbnRJZDogc3RyaW5nLFxuICAgIHByaXZhdGUgaW5pdE9wdGlvbnM6IGFueSA9IHtcbiAgICAgIC8vIHNjb3BlOiAnZW1haWwscHVibGljX3Byb2ZpbGUsdXNlcl9mcmllbmRzLHVzZXJfcG9zdHMnLFxuICAgICAgc2NvcGU6ICdlbWFpbCxwdWJsaWNfcHJvZmlsZSx1c2VyX2ZyaWVuZHMsdXNlcl9wb3N0cycsXG4gICAgICBsb2NhbGU6ICdlbl9VUycsXG4gICAgICBmaWVsZHM6ICduYW1lLGVtYWlsLHBpY3R1cmUsZmlyc3RfbmFtZSxsYXN0X25hbWUsZnJpZW5kc3tzdW1tYXJ5e3RvdGFsX2NvdW50fX0scG9zdHN7ZnVsbF9waWN0dXJlLGNyZWF0ZWRfdGltZSwgY29tbWVudHMsIHJlYWN0aW9uc30nLFxuICAgICAgdmVyc2lvbjogJ3Y0LjAnLFxuICAgIH1cbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMubG9hZFNjcmlwdChcbiAgICAgICAgICBGYWNlYm9va0xvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQsXG4gICAgICAgICAgYC8vY29ubmVjdC5mYWNlYm9vay5uZXQvJHt0aGlzLmluaXRPcHRpb25zLmxvY2FsZX0vc2RrLmpzYCxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBGQi5pbml0KHtcbiAgICAgICAgICAgICAgYXBwSWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICAgICAgICAgIGF1dG9Mb2dBcHBFdmVudHM6IHRydWUsXG4gICAgICAgICAgICAgIGNvb2tpZTogdHJ1ZSxcbiAgICAgICAgICAgICAgeGZibWw6IHRydWUsXG4gICAgICAgICAgICAgIHZlcnNpb246IHRoaXMuaW5pdE9wdGlvbnMudmVyc2lvbixcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0TG9naW5TdGF0dXMoKTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIEZCLmdldExvZ2luU3RhdHVzKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09ICdjb25uZWN0ZWQnKSB7XG4gICAgICAgICAgbGV0IHVzZXI6IFNvY2lhbFVzZXIgPSBuZXcgU29jaWFsVXNlcigpO1xuICAgICAgICAgIGxldCBhdXRoUmVzcG9uc2UgPSByZXNwb25zZS5hdXRoUmVzcG9uc2U7XG4gICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSBhdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW47XG4gICAgICAgICAgXG4gICAgICAgICAgRkIuYXBpKGAvbWU/ZmllbGRzPSR7dGhpcy5pbml0T3B0aW9ucy5maWVsZHN9YCwgKGZiVXNlcjogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgdXNlcjogU29jaWFsVXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XG5cbiAgICAgICAgICAgIHVzZXIuaWQgPSBmYlVzZXIuaWQ7XG4gICAgICAgICAgICB1c2VyLm5hbWUgPSBmYlVzZXIubmFtZTtcbiAgICAgICAgICAgIHVzZXIuZW1haWwgPSBmYlVzZXIuZW1haWw7XG4gICAgICAgICAgICB1c2VyLnBob3RvVXJsID0gZmJVc2VyLnBpY3R1cmUuZGF0YS51cmw7XG4gICAgICAgICAgICAgIC8vICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8nICtcbiAgICAgICAgICAgICAgLy8gZmJVc2VyLmlkICtcbiAgICAgICAgICAgICAgLy8gJy9waWN0dXJlP3R5cGU9bm9ybWFsJztcbiAgICAgICAgICAgIHVzZXIuZmlyc3ROYW1lID0gZmJVc2VyLmZpcnN0X25hbWU7XG4gICAgICAgICAgICB1c2VyLmxhc3ROYW1lID0gZmJVc2VyLmxhc3RfbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHVzZXIucmVzcG9uc2UgPSBmYlVzZXI7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlc29sdmUodXNlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KGBObyB1c2VyIGlzIGN1cnJlbnRseSBsb2dnZWQgaW4gd2l0aCAke0ZhY2Vib29rTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRH1gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzaWduSW4oc2lnbkluT3B0aW9ucz86IGFueSk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IC4uLnRoaXMuaW5pdE9wdGlvbnMsIC4uLnNpZ25Jbk9wdGlvbnMgfTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgRkIubG9naW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmF1dGhSZXNwb25zZSkge1xuICAgICAgICAgIGxldCB1c2VyOiBTb2NpYWxVc2VyID0gbmV3IFNvY2lhbFVzZXIoKTtcbiAgICAgICAgICBsZXQgYXV0aFJlc3BvbnNlID0gcmVzcG9uc2UuYXV0aFJlc3BvbnNlO1xuICAgICAgICAgIHVzZXIuYXV0aFRva2VuID0gYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xuICAgICAgICAgIC8vIHJlc29sdmUodXNlcik7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2FjY2Vzc190b2tlbiA9ICcsdXNlci5hdXRoVG9rZW4pO1xuICAgICAgICAgIEZCLmFwaShgL21lP2ZpZWxkcz0ke29wdGlvbnMuZmllbGRzfWAsIChmYlVzZXI6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gRkIuYXBpKGAvbWUvcGVybWlzc2lvbnM9JHtvcHRpb25zLmZpZWxkc31gLCAoZmJVc2VyOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgdXNlci5pZCA9IGZiVXNlci5pZDtcbiAgICAgICAgICAgIHVzZXIubmFtZSA9IGZiVXNlci5uYW1lO1xuICAgICAgICAgICAgdXNlci5lbWFpbCA9IGZiVXNlci5lbWFpbDtcbiAgICAgICAgICAgIHVzZXIucGhvdG9VcmwgPSBmYlVzZXIucGljdHVyZS5kYXRhLnVybDtcbiAgICAgICAgICAgICAgLy8gJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLycgK1xuICAgICAgICAgICAgICAvLyBmYlVzZXIuaWQgK1xuICAgICAgICAgICAgICAvLyAnL3BpY3R1cmU/dHlwZT1ub3JtYWwnO1xuICAgICAgICAgICAgdXNlci5maXJzdE5hbWUgPSBmYlVzZXIuZmlyc3RfbmFtZTtcbiAgICAgICAgICAgIHVzZXIubGFzdE5hbWUgPSBmYlVzZXIubGFzdF9uYW1lO1xuICAgICAgICAgICAgLy8gdXNlci5hdXRoVG9rZW4gPSBhdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW47XG5cbiAgICAgICAgICAgIHVzZXIucmVzcG9uc2UgPSBmYlVzZXI7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlc29sdmUodXNlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KCdVc2VyIGNhbmNlbGxlZCBsb2dpbiBvciBkaWQgbm90IGZ1bGx5IGF1dGhvcml6ZS4nKTtcbiAgICAgICAgfVxuICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBzaWduT3V0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBGQi5sb2dvdXQoKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==