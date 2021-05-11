import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export declare class InstagramLoginProvider extends BaseLoginProvider {
    private clientId;
    private initOptions;
    private initInstaOptions;
    static readonly PROVIDER_ID: string;
    constructor(clientId: string, initOptions?: any, initInstaOptions?: any);
    initialize(): Promise<void>;
    getLoginStatus(): Promise<SocialUser>;
    signIn(signInOptions?: any): Promise<SocialUser>;
    signOut(): Promise<void>;
}
