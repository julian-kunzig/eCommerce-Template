import { LoginProvider } from './login-provider';
import { SocialUser } from './social-user';
export declare abstract class BaseLoginProvider implements LoginProvider {
    constructor();
    abstract initialize(): Promise<void>;
    abstract getLoginStatus(): Promise<SocialUser>;
    abstract signIn(): Promise<SocialUser>;
    abstract signOut(revoke?: boolean): Promise<any>;
    protected loadScript(id: string, src: string, onload: any, parentElement?: any): void;
}
