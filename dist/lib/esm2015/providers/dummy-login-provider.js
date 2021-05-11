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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktbG9naW4tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvU291cmNlcy93b3Jrc3BhY2VzL2luZmlub3ZhZS1kYXNoYm9hcmQvcHJvamVjdHMvbGliL3NyYy8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9kdW1teS1sb2dpbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUlsRSw4RUFBOEU7QUFDOUUsRUFBRTtBQUNGLDZDQUE2QztBQUM3QyxFQUFFO0FBQ0YsZ0dBQWdHO0FBQ2hHLEVBQUU7QUFDRixtQ0FBbUM7QUFDbkMsd0JBQXdCO0FBQ3hCLDJCQUEyQjtBQUMzQixnQ0FBZ0M7QUFDaEMsMkJBQTJCO0FBQzNCLHdCQUF3QjtBQUN4QixtQ0FBbUM7QUFDbkMsaUdBQWlHO0FBQ2pHLHlCQUF5QjtBQUN6QiwrQkFBK0I7QUFDL0IseUNBQXlDO0FBQ3pDLEtBQUs7QUFDTCxFQUFFO0FBQ0Ysd0NBQXdDO0FBQ3hDLFlBQVk7QUFDWixLQUFLO0FBQ0wsNENBQTRDO0FBQzVDLDRGQUE0RjtBQUM1RixPQUFPO0FBQ1AsV0FBVztBQUNYLE9BQU87QUFHUCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsaUJBQWlCO0lBcUJ2RCxZQUFZLEtBQWtCO1FBQzVCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNwQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUM7U0FDOUM7UUFFRCxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyQjtpQkFBTTtnQkFDTCxNQUFNLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBZ0I7UUFDdEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUE1RHNCLDhCQUFXLEdBQVcsT0FBTyxDQUFDO0FBRXJDLCtCQUFZLEdBQUc7SUFDN0IsRUFBRSxFQUFFLFlBQVk7SUFDaEIsSUFBSSxFQUFFLGNBQWM7SUFDcEIsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixTQUFTLEVBQUUsUUFBUTtJQUNuQixRQUFRLEVBQUUsT0FBTztJQUNqQixTQUFTLEVBQUUsZ0JBQWdCO0lBQzNCLFFBQVEsRUFBRSxxREFBcUQ7SUFDL0QsUUFBUSxFQUFFLE9BQU87SUFDakIsT0FBTyxFQUFFLGNBQWM7SUFDdkIsaUJBQWlCLEVBQUUsZUFBZTtJQUNsQyxRQUFRLEVBQUUsRUFBRTtDQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VMb2dpblByb3ZpZGVyfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcbmltcG9ydCB7U29jaWFsVXNlcn0gZnJvbSAnLi4vZW50aXRpZXMvc29jaWFsLXVzZXInO1xuXG5cbi8vIFNpbXVsYXRlcyBsb2dpbiAvIGxvZ291dCB3aXRob3V0IGFjdHVhbGx5IHJlcXVpcmluZyBhbiBJbnRlcm5ldCBjb25uZWN0aW9uLlxuLy9cbi8vIFVzZWZ1bCBmb3IgY2VydGFpbiBkZXZlbG9wbWVudCBzaXR1YXRpb25zLlxuLy9cbi8vIEZvciBleGFtcGxlLCBpZiB5b3Ugd2FudCB0byBzaW11bGF0ZSB0aGUgZ3JlYXRlc3QgZm9vdGJhbGwgcmVmZXJlZSBFbmdsYW5kIGhhcyBldmVyIHByb2R1Y2VkOlxuLy9cbi8vICBjb25zdCBkdW1teVVzZXI6IFNvY2lhbFVzZXIgPSB7XG4vLyAgICAgaWQ6ICcwMTIzNDU2Nzg5Jyxcbi8vICAgICBuYW1lOiAnSG93YXJkIFdlYmInLFxuLy8gICAgIGVtYWlsOiAnaG93YXJkQHdlYmIuY29tJyxcbi8vICAgICBmaXJzdE5hbWU6ICdIb3dhcmQnLFxuLy8gICAgIGxhc3ROYW1lOiAnV2ViYicsXG4vLyAgICAgYXV0aFRva2VuOiAnZHVtbXlBdXRoVG9rZW4nLFxuLy8gICAgIHBob3RvVXJsOiAnaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSG93YXJkX1dlYmIjL21lZGlhL0ZpbGU6SG93YXJkX1dlYmJfbWFyY2gxMS5qcGcnLFxuLy8gICAgIHByb3ZpZGVyOiAnRFVNTVknLFxuLy8gICAgIGlkVG9rZW46ICdkdW1teUlkVG9rZW4nLFxuLy8gICAgIGF1dGhvcml6YXRpb25Db2RlOiAnZHVtbXlBdXRoQ29kZSdcbi8vIH07XG4vL1xuLy8gIGxldCBjb25maWcgPSBuZXcgQXV0aFNlcnZpY2VDb25maWcoW1xuLy8gIHsgLi4uIH0sXG4vLyAge1xuLy8gICAgICAgaWQ6IER1bW15TG9naW5Qcm92aWRlci5QUk9WSURFUl9JRCxcbi8vICAgICAgIHByb3ZpZGVyOiBuZXcgRHVtbXlMb2dpblByb3ZpZGVyKGR1bW15VXNlcikgIC8vIFBhc3MgeW91ciB1c2VyIGludG8gdGhlIGNvbnN0cnVjdG9yXG4vLyAgIH0sXG4vLyAgeyAuLi4gfVxuLy8gIF0pO1xuXG5cbmV4cG9ydCBjbGFzcyBEdW1teUxvZ2luUHJvdmlkZXIgZXh0ZW5kcyBCYXNlTG9naW5Qcm92aWRlciB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUFJPVklERVJfSUQ6IHN0cmluZyA9ICdEVU1NWSc7XG5cbiAgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfVVNFUiA9IHtcbiAgICBpZDogJzEyMzQ1Njc4OTAnLFxuICAgIG5hbWU6ICdNaWNrZXkgTW91c2UnLFxuICAgIGVtYWlsOiAnbWlja2V5QG1vdXNlLmNvbScsXG4gICAgZmlyc3ROYW1lOiAnTWlja2V5JyxcbiAgICBsYXN0TmFtZTogJ01vdXNlJyxcbiAgICBhdXRoVG9rZW46ICdkdW1teUF1dGhUb2tlbicsXG4gICAgcGhvdG9Vcmw6ICdodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaWxlOk1pY2tleV9Nb3VzZS5wbmcnLFxuICAgIHByb3ZpZGVyOiAnRFVNTVknLFxuICAgIGlkVG9rZW46ICdkdW1teUlkVG9rZW4nLFxuICAgIGF1dGhvcml6YXRpb25Db2RlOiAnZHVtbXlBdXRoQ29kZScsXG4gICAgcmVzcG9uc2U6IHt9XG4gIH07XG5cbiAgcHJpdmF0ZSBkdW1teTogU29jaWFsVXNlcjtcblxuICBwcml2YXRlIGxvZ2dlZEluOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGR1bW15PzogU29jaWFsVXNlcikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKGR1bW15KSB7XG4gICAgICB0aGlzLmR1bW15ID0gZHVtbXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHVtbXkgPSBEdW1teUxvZ2luUHJvdmlkZXIuREVGQVVMVF9VU0VSO1xuICAgIH1cblxuICAgIC8vIFN0YXJ0IG5vdCBsb2dnZWQgaW5cbiAgICB0aGlzLmxvZ2dlZEluID0gZmFsc2U7XG4gIH1cblxuICBnZXRMb2dpblN0YXR1cygpOiBQcm9taXNlPFNvY2lhbFVzZXI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMubG9nZ2VkSW4pIHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmR1bW15KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCgnTm8gdXNlciBpcyBjdXJyZW50bHkgbG9nZ2VkIGluLicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgc2lnbkluKCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgIHJlc29sdmUodGhpcy5kdW1teSk7XG4gICAgfSk7XG4gIH1cblxuICBzaWduT3V0KHJldm9rZT86IGJvb2xlYW4pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlZEluID0gZmFsc2U7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==