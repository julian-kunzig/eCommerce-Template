import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
/**
 * Protocol modes supported by MSAL.
 */
export declare enum ProtocolMode {
    AAD = "AAD",
    OIDC = "OIDC"
}
/**
 * Initialization Options for Microsoft Provider: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/initialization.md
 * Details (not all options are supported): https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export declare type MicrosoftOptions = {
    redirect_uri?: string;
    logout_redirect_uri?: string;
    authority?: string;
    knownAuthorities?: string[];
    protocolMode?: ProtocolMode;
    clientCapabilities?: string[];
    cacheLocation?: string;
    scopes?: string[];
};
/**
 * Microsoft Authentication using MSAL v2: https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser
 */
export declare class MicrosoftLoginProvider extends BaseLoginProvider {
    private clientId;
    private _instance;
    static readonly PROVIDER_ID: string;
    private initOptions;
    constructor(clientId: string, initOptions?: MicrosoftOptions);
    initialize(): Promise<void>;
    private getSocialUser;
    getLoginStatus(): Promise<SocialUser>;
    signIn(): Promise<SocialUser>;
    signOut(revoke?: boolean): Promise<any>;
}
