import { ModuleWithProviders } from '@angular/core';
import { SocialAuthServiceConfig } from './socialauth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class SocialLoginModule {
    static initialize(config: SocialAuthServiceConfig): ModuleWithProviders<SocialLoginModule>;
    constructor(parentModule: SocialLoginModule);
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<SocialLoginModule, never, [typeof i1.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDef<SocialLoginModule>;
}
