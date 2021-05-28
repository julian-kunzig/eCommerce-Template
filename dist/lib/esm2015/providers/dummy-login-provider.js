import { BaseLoginProvider } from '../entities/base-login-provider';
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
export class DummyLoginProvider extends BaseLoginProvider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktbG9naW4tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvYWxleGgvRGVza3RvcC9pbmZpbm92YWUvcHJvamVjdHMvbGliL3NyYy8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9kdW1teS1sb2dpbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUlsRSw4RUFBOEU7QUFDOUUsRUFBRTtBQUNGLDZDQUE2QztBQUM3QyxFQUFFO0FBQ0YsZ0dBQWdHO0FBQ2hHLEVBQUU7QUFDRixtQ0FBbUM7QUFDbkMsd0JBQXdCO0FBQ3hCLDJCQUEyQjtBQUMzQixnQ0FBZ0M7QUFDaEMsMkJBQTJCO0FBQzNCLHdCQUF3QjtBQUN4QixtQ0FBbUM7QUFDbkMsaUdBQWlHO0FBQ2pHLHlCQUF5QjtBQUN6QiwrQkFBK0I7QUFDL0IseUNBQXlDO0FBQ3pDLEtBQUs7QUFDTCxFQUFFO0FBQ0Ysd0NBQXdDO0FBQ3hDLFlBQVk7QUFDWixLQUFLO0FBQ0wsNENBQTRDO0FBQzVDLDRGQUE0RjtBQUM1RixPQUFPO0FBQ1AsV0FBVztBQUNYLE9BQU87QUFHUCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsaUJBQWlCO0lBcUJ2RCxZQUFZLEtBQWtCO1FBQzVCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNwQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUM7U0FDOUM7UUFFRCxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyQjtpQkFBTTtnQkFDTCxNQUFNLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBZ0I7UUFDdEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUE1RHNCLDhCQUFXLEdBQVcsT0FBTyxDQUFDO0FBRXJDLCtCQUFZLEdBQUc7SUFDN0IsRUFBRSxFQUFFLFlBQVk7SUFDaEIsSUFBSSxFQUFFLGNBQWM7SUFDcEIsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixTQUFTLEVBQUUsUUFBUTtJQUNuQixRQUFRLEVBQUUsT0FBTztJQUNqQixTQUFTLEVBQUUsZ0JBQWdCO0lBQzNCLFFBQVEsRUFBRSxxREFBcUQ7SUFDL0QsUUFBUSxFQUFFLE9BQU87SUFDakIsT0FBTyxFQUFFLGNBQWM7SUFDdkIsaUJBQWlCLEVBQUUsZUFBZTtJQUNsQyxRQUFRLEVBQUUsRUFBRTtDQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VMb2dpblByb3ZpZGVyfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHtTb2NpYWxVc2VyfSBmcm9tICcuLi9lbnRpdGllcy9zb2NpYWwtdXNlcic7XHJcblxyXG5cclxuLy8gU2ltdWxhdGVzIGxvZ2luIC8gbG9nb3V0IHdpdGhvdXQgYWN0dWFsbHkgcmVxdWlyaW5nIGFuIEludGVybmV0IGNvbm5lY3Rpb24uXHJcbi8vXHJcbi8vIFVzZWZ1bCBmb3IgY2VydGFpbiBkZXZlbG9wbWVudCBzaXR1YXRpb25zLlxyXG4vL1xyXG4vLyBGb3IgZXhhbXBsZSwgaWYgeW91IHdhbnQgdG8gc2ltdWxhdGUgdGhlIGdyZWF0ZXN0IGZvb3RiYWxsIHJlZmVyZWUgRW5nbGFuZCBoYXMgZXZlciBwcm9kdWNlZDpcclxuLy9cclxuLy8gIGNvbnN0IGR1bW15VXNlcjogU29jaWFsVXNlciA9IHtcclxuLy8gICAgIGlkOiAnMDEyMzQ1Njc4OScsXHJcbi8vICAgICBuYW1lOiAnSG93YXJkIFdlYmInLFxyXG4vLyAgICAgZW1haWw6ICdob3dhcmRAd2ViYi5jb20nLFxyXG4vLyAgICAgZmlyc3ROYW1lOiAnSG93YXJkJyxcclxuLy8gICAgIGxhc3ROYW1lOiAnV2ViYicsXHJcbi8vICAgICBhdXRoVG9rZW46ICdkdW1teUF1dGhUb2tlbicsXHJcbi8vICAgICBwaG90b1VybDogJ2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hvd2FyZF9XZWJiIy9tZWRpYS9GaWxlOkhvd2FyZF9XZWJiX21hcmNoMTEuanBnJyxcclxuLy8gICAgIHByb3ZpZGVyOiAnRFVNTVknLFxyXG4vLyAgICAgaWRUb2tlbjogJ2R1bW15SWRUb2tlbicsXHJcbi8vICAgICBhdXRob3JpemF0aW9uQ29kZTogJ2R1bW15QXV0aENvZGUnXHJcbi8vIH07XHJcbi8vXHJcbi8vICBsZXQgY29uZmlnID0gbmV3IEF1dGhTZXJ2aWNlQ29uZmlnKFtcclxuLy8gIHsgLi4uIH0sXHJcbi8vICB7XHJcbi8vICAgICAgIGlkOiBEdW1teUxvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQsXHJcbi8vICAgICAgIHByb3ZpZGVyOiBuZXcgRHVtbXlMb2dpblByb3ZpZGVyKGR1bW15VXNlcikgIC8vIFBhc3MgeW91ciB1c2VyIGludG8gdGhlIGNvbnN0cnVjdG9yXHJcbi8vICAgfSxcclxuLy8gIHsgLi4uIH1cclxuLy8gIF0pO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBEdW1teUxvZ2luUHJvdmlkZXIgZXh0ZW5kcyBCYXNlTG9naW5Qcm92aWRlciB7XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBQUk9WSURFUl9JRDogc3RyaW5nID0gJ0RVTU1ZJztcclxuXHJcbiAgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfVVNFUiA9IHtcclxuICAgIGlkOiAnMTIzNDU2Nzg5MCcsXHJcbiAgICBuYW1lOiAnTWlja2V5IE1vdXNlJyxcclxuICAgIGVtYWlsOiAnbWlja2V5QG1vdXNlLmNvbScsXHJcbiAgICBmaXJzdE5hbWU6ICdNaWNrZXknLFxyXG4gICAgbGFzdE5hbWU6ICdNb3VzZScsXHJcbiAgICBhdXRoVG9rZW46ICdkdW1teUF1dGhUb2tlbicsXHJcbiAgICBwaG90b1VybDogJ2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0ZpbGU6TWlja2V5X01vdXNlLnBuZycsXHJcbiAgICBwcm92aWRlcjogJ0RVTU1ZJyxcclxuICAgIGlkVG9rZW46ICdkdW1teUlkVG9rZW4nLFxyXG4gICAgYXV0aG9yaXphdGlvbkNvZGU6ICdkdW1teUF1dGhDb2RlJyxcclxuICAgIHJlc3BvbnNlOiB7fVxyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgZHVtbXk6IFNvY2lhbFVzZXI7XHJcblxyXG4gIHByaXZhdGUgbG9nZ2VkSW46IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGR1bW15PzogU29jaWFsVXNlcikge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmIChkdW1teSkge1xyXG4gICAgICB0aGlzLmR1bW15ID0gZHVtbXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmR1bW15ID0gRHVtbXlMb2dpblByb3ZpZGVyLkRFRkFVTFRfVVNFUjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdGFydCBub3QgbG9nZ2VkIGluXHJcbiAgICB0aGlzLmxvZ2dlZEluID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXRMb2dpblN0YXR1cygpOiBQcm9taXNlPFNvY2lhbFVzZXI+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmxvZ2dlZEluKSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmR1bW15KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QoJ05vIHVzZXIgaXMgY3VycmVudGx5IGxvZ2dlZCBpbi4nKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaWduSW4oKTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLmxvZ2dlZEluID0gdHJ1ZTtcclxuICAgICAgcmVzb2x2ZSh0aGlzLmR1bW15KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2lnbk91dChyZXZva2U/OiBib29sZWFuKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMubG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==