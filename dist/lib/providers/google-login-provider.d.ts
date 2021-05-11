import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export declare class GoogleLoginProvider extends BaseLoginProvider {
    private clientId;
    private initOptions;
    static readonly PROVIDER_ID: string;
    protected auth2: any;
    constructor(clientId: string, initOptions?: any);
    initialize(): Promise<void>;
    getLoginStatus(loginStatusOptions?: any): Promise<SocialUser>;
    signIn(signInOptions?: any): Promise<SocialUser>;
    signOut(revoke?: boolean): Promise<void>;
}
