import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export declare class AmazonLoginProvider extends BaseLoginProvider {
    private clientId;
    private initOptions;
    static readonly PROVIDER_ID: string;
    constructor(clientId: string, initOptions?: any);
    initialize(): Promise<void>;
    getLoginStatus(): Promise<SocialUser>;
    signIn(signInOptions?: any): Promise<SocialUser>;
    signOut(revoke?: boolean): Promise<any>;
    private persistToken;
    private retrieveToken;
    private clearToken;
}
