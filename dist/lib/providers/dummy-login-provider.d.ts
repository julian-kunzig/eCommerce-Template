import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export declare class DummyLoginProvider extends BaseLoginProvider {
    static readonly PROVIDER_ID: string;
    static readonly DEFAULT_USER: {
        id: string;
        name: string;
        email: string;
        firstName: string;
        lastName: string;
        authToken: string;
        photoUrl: string;
        provider: string;
        idToken: string;
        authorizationCode: string;
        response: {};
    };
    private dummy;
    private loggedIn;
    constructor(dummy?: SocialUser);
    getLoginStatus(): Promise<SocialUser>;
    initialize(): Promise<void>;
    signIn(): Promise<SocialUser>;
    signOut(revoke?: boolean): Promise<any>;
}
