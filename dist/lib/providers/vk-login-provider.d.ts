import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export declare class VKLoginProvider extends BaseLoginProvider {
    private clientId;
    private initOptions;
    constructor(clientId: string, initOptions?: any);
    static readonly PROVIDER_ID: string;
    private readonly VK_API_URL;
    private readonly VK_API_GET_USER;
    initialize(): Promise<void>;
    getLoginStatus(): Promise<SocialUser>;
    signIn(): Promise<SocialUser>;
    signOut(): Promise<any>;
    private signInInternal;
    private getUser;
    private getLoginStatusInternal;
    private createUser;
}
