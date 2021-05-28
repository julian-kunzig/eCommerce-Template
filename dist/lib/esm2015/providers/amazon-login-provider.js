import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export class AmazonLoginProvider extends BaseLoginProvider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1hem9uLWxvZ2luLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2FsZXhoL0Rlc2t0b3AvaW5maW5vdmFlL3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJwcm92aWRlcnMvYW1hem9uLWxvZ2luLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUlyRCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsaUJBQWlCO0lBR3hELFlBQ1UsUUFBZ0IsRUFDaEIsY0FBbUI7UUFDekIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsVUFBVSxFQUFFO1lBQ1YsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRTtTQUM5QjtRQUNELFlBQVksRUFBRSxRQUFRLENBQUMsTUFBTTtLQUM5QjtRQUVELEtBQUssRUFBRSxDQUFDO1FBVEEsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FNbEI7SUFHSCxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLFFBQVEsRUFBRTtZQUNaLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDO1lBQzlCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsRUFBRTtZQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDO1FBRUYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFN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SSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSTtnQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUV0QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sWUFBWSxDQUFDLEtBQWE7UUFDaEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLG1CQUFtQixDQUFDLFdBQVcsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFTyxhQUFhO1FBQ25CLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLG1CQUFtQixDQUFDLFdBQVcsUUFBUSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVPLFVBQVU7UUFDaEIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLFdBQVcsUUFBUSxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7QUF2SHNCLCtCQUFXLEdBQVcsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUxvZ2luUHJvdmlkZXIgfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4uL2VudGl0aWVzL3NvY2lhbC11c2VyJztcclxuXHJcbmRlY2xhcmUgbGV0IGFtYXpvbjogYW55LCB3aW5kb3c6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbWF6b25Mb2dpblByb3ZpZGVyIGV4dGVuZHMgQmFzZUxvZ2luUHJvdmlkZXIge1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUFJPVklERVJfSUQ6IHN0cmluZyA9ICdBTUFaT04nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2xpZW50SWQ6IHN0cmluZyxcclxuICAgIHByaXZhdGUgaW5pdE9wdGlvbnM6IGFueSA9IHtcclxuICAgICAgc2NvcGU6ICdwcm9maWxlJyxcclxuICAgICAgc2NvcGVfZGF0YToge1xyXG4gICAgICAgIHByb2ZpbGU6IHsgZXNzZW50aWFsOiBmYWxzZSB9LFxyXG4gICAgICB9LFxyXG4gICAgICByZWRpcmVjdF91cmk6IGxvY2F0aW9uLm9yaWdpbixcclxuICAgIH1cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IGFtYXpvblJvb3QgPSBudWxsO1xyXG4gICAgaWYgKGRvY3VtZW50KSB7XHJcbiAgICAgIGFtYXpvblJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgYW1hem9uUm9vdC5pZCA9ICdhbWF6b24tcm9vdCc7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYW1hem9uUm9vdCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93Lm9uQW1hem9uTG9naW5SZWFkeSA9ICgpID0+IHtcclxuICAgICAgYW1hem9uLkxvZ2luLnNldENsaWVudElkKHRoaXMuY2xpZW50SWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMubG9hZFNjcmlwdChcclxuICAgICAgICAgICdhbWF6b24tbG9naW4tc2RrJyxcclxuICAgICAgICAgICdodHRwczovL2Fzc2V0cy5sb2dpbndpdGhhbWF6b24uY29tL3Nkay9uYS9sb2dpbjEuanMnLFxyXG4gICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYW1hem9uUm9vdFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldExvZ2luU3RhdHVzKCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IHRva2VuID0gdGhpcy5yZXRyaWV2ZVRva2VuKCk7XHJcblxyXG4gICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICBhbWF6b24uTG9naW4ucmV0cmlldmVQcm9maWxlKHRva2VuLCAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIGxldCB1c2VyOiBTb2NpYWxVc2VyID0gbmV3IFNvY2lhbFVzZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHVzZXIuaWQgPSByZXNwb25zZS5wcm9maWxlLkN1c3RvbWVySWQ7XHJcbiAgICAgICAgICAgIHVzZXIubmFtZSA9IHJlc3BvbnNlLnByb2ZpbGUuTmFtZTtcclxuICAgICAgICAgICAgdXNlci5lbWFpbCA9IHJlc3BvbnNlLnByb2ZpbGUuUHJpbWFyeUVtYWlsO1xyXG4gICAgICAgICAgICB1c2VyLnJlc3BvbnNlID0gcmVzcG9uc2UucHJvZmlsZTtcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QocmVzcG9uc2UuZXJyb3IpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdChgTm8gdXNlciBpcyBjdXJyZW50bHkgbG9nZ2VkIGluIHdpdGggJHtBbWF6b25Mb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEfWApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNpZ25JbihzaWduSW5PcHRpb25zPzogYW55KTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICBjb25zdCBvcHRpb25zID0geyAuLi50aGlzLmluaXRPcHRpb25zLCAuLi5zaWduSW5PcHRpb25zIH07XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhbWF6b24uTG9naW4uYXV0aG9yaXplKG9wdGlvbnMsIChhdXRoUmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAoYXV0aFJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICAgICAgICByZWplY3QoYXV0aFJlc3BvbnNlLmVycm9yKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYW1hem9uLkxvZ2luLnJldHJpZXZlUHJvZmlsZShcclxuICAgICAgICAgICAgYXV0aFJlc3BvbnNlLmFjY2Vzc190b2tlbixcclxuICAgICAgICAgICAgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgbGV0IHVzZXI6IFNvY2lhbFVzZXIgPSBuZXcgU29jaWFsVXNlcigpO1xyXG5cclxuICAgICAgICAgICAgICB1c2VyLmlkID0gcmVzcG9uc2UucHJvZmlsZS5DdXN0b21lcklkO1xyXG4gICAgICAgICAgICAgIHVzZXIubmFtZSA9IHJlc3BvbnNlLnByb2ZpbGUuTmFtZTtcclxuICAgICAgICAgICAgICB1c2VyLmVtYWlsID0gcmVzcG9uc2UucHJvZmlsZS5QcmltYXJ5RW1haWw7XHJcbiAgICAgICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSBhdXRoUmVzcG9uc2UuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgICAgICAgIHVzZXIucmVzcG9uc2UgPSByZXNwb25zZS5wcm9maWxlO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLnBlcnNpc3RUb2tlbihhdXRoUmVzcG9uc2UuYWNjZXNzX3Rva2VuKTtcclxuXHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaWduT3V0KHJldm9rZT86IGJvb2xlYW4pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhbWF6b24uTG9naW4ubG9nb3V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXJUb2tlbigpO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmVqZWN0KGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBlcnNpc3RUb2tlbih0b2tlbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtBbWF6b25Mb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEfV90b2tlbmAsIHRva2VuKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmV0cmlldmVUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke0FtYXpvbkxvZ2luUHJvdmlkZXIuUFJPVklERVJfSUR9X3Rva2VuYCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFyVG9rZW4oKTogdm9pZCB7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtBbWF6b25Mb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEfV90b2tlbmApO1xyXG4gIH1cclxufVxyXG4iXX0=