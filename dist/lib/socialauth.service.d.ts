import { Observable } from 'rxjs';
import { LoginProvider } from './entities/login-provider';
import { SocialUser } from './entities/social-user';
import * as i0 from "@angular/core";
export interface SocialAuthServiceConfig {
    autoLogin?: boolean;
    providers: {
        id: string;
        provider: LoginProvider;
    }[];
    onError?: (error: any) => any;
}
/** @dynamic */
export declare class SocialAuthService {
    private static readonly ERR_LOGIN_PROVIDER_NOT_FOUND;
    private static readonly ERR_NOT_LOGGED_IN;
    private static readonly ERR_NOT_INITIALIZED;
    private static readonly ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN;
    private providers;
    private autoLogin;
    private _user_google;
    private _user_fb;
    private _user_insta;
    private _authState_google;
    private _authState_fb;
    private _authState_insta;
    private initialized;
    private _initState;
    get authState_google(): Observable<SocialUser>;
    get authState_fb(): Observable<SocialUser>;
    get authState_insta(): Observable<SocialUser>;
    get initState(): Observable<boolean>;
    constructor(config: SocialAuthServiceConfig | Promise<SocialAuthServiceConfig>);
    private initialize;
    refreshAuthToken(providerId: string): Promise<void>;
    signIn(providerId: string, signInOptions?: any): Promise<SocialUser>;
    signOut(providerId: string, revoke?: boolean): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDef<SocialAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDef<SocialAuthService>;
}
