import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthService } from './socialauth.service';
import * as i0 from "@angular/core";
export class SocialLoginModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('SocialLoginModule is already loaded. Import it in the AppModule only');
        }
    }
    static initialize(config) {
        return {
            ngModule: SocialLoginModule,
            providers: [
                SocialAuthService,
                {
                    provide: 'SocialAuthServiceConfig',
                    useValue: config
                }
            ]
        };
    }
}
SocialLoginModule.ɵmod = i0.ɵɵdefineNgModule({ type: SocialLoginModule });
SocialLoginModule.ɵinj = i0.ɵɵdefineInjector({ factory: function SocialLoginModule_Factory(t) { return new (t || SocialLoginModule)(i0.ɵɵinject(SocialLoginModule, 12)); }, providers: [
        SocialAuthService
    ], imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SocialLoginModule, { imports: [CommonModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SocialLoginModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule
                ],
                providers: [
                    SocialAuthService
                ]
            }]
    }], function () { return [{ type: SocialLoginModule, decorators: [{
                type: Optional
            }, {
                type: SkipSelf
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsbG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2FsZXhoL0Rlc2t0b3AvaW5maW5vdmFlL3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJzb2NpYWxsb2dpbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQTJCLE1BQU0sc0JBQXNCLENBQUM7O0FBVWxGLE1BQU0sT0FBTyxpQkFBaUI7SUFjNUIsWUFBb0MsWUFBK0I7UUFDakUsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYixzRUFBc0UsQ0FBQyxDQUFDO1NBQzNFO0lBQ0gsQ0FBQztJQWxCTSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQStCO1FBQ3RELE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxpQkFBaUI7Z0JBQ2pCO29CQUNFLE9BQU8sRUFBRSx5QkFBeUI7b0JBQ2xDLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O3FEQVpVLGlCQUFpQjtpSEFBakIsaUJBQWlCLGNBY3NCLGlCQUFpQixzQkFsQnhEO1FBQ1QsaUJBQWlCO0tBQ2xCLFlBTFE7WUFDUCxZQUFZO1NBQ2I7d0ZBS1UsaUJBQWlCLGNBTjFCLFlBQVk7a0RBTUgsaUJBQWlCO2NBUjdCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsaUJBQWlCO2lCQUNsQjthQUNGO3NDQWVtRCxpQkFBaUI7c0JBQXRELFFBQVE7O3NCQUFJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIE5nTW9kdWxlLFxyXG4gIE9wdGlvbmFsLFxyXG4gIFNraXBTZWxmLFxyXG4gIE1vZHVsZVdpdGhQcm92aWRlcnNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFNvY2lhbEF1dGhTZXJ2aWNlLCBTb2NpYWxBdXRoU2VydmljZUNvbmZpZyB9IGZyb20gJy4vc29jaWFsYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFNvY2lhbEF1dGhTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU29jaWFsTG9naW5Nb2R1bGUge1xyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShjb25maWc6IFNvY2lhbEF1dGhTZXJ2aWNlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTb2NpYWxMb2dpbk1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IFNvY2lhbExvZ2luTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBTb2NpYWxBdXRoU2VydmljZSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiAnU29jaWFsQXV0aFNlcnZpY2VDb25maWcnLFxyXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogU29jaWFsTG9naW5Nb2R1bGUpIHtcclxuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICdTb2NpYWxMb2dpbk1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=