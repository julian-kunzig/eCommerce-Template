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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsbG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1NvdXJjZXMvd29ya3NwYWNlcy9pbmZpbm92YWUtZGFzaGJvYXJkL3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJzb2NpYWxsb2dpbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQTJCLE1BQU0sc0JBQXNCLENBQUM7O0FBVWxGLE1BQU0sT0FBTyxpQkFBaUI7SUFjNUIsWUFBb0MsWUFBK0I7UUFDakUsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYixzRUFBc0UsQ0FBQyxDQUFDO1NBQzNFO0lBQ0gsQ0FBQztJQWxCTSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQStCO1FBQ3RELE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxpQkFBaUI7Z0JBQ2pCO29CQUNFLE9BQU8sRUFBRSx5QkFBeUI7b0JBQ2xDLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O3FEQVpVLGlCQUFpQjtpSEFBakIsaUJBQWlCLGNBY3NCLGlCQUFpQixzQkFsQnhEO1FBQ1QsaUJBQWlCO0tBQ2xCLFlBTFE7WUFDUCxZQUFZO1NBQ2I7d0ZBS1UsaUJBQWlCLGNBTjFCLFlBQVk7a0RBTUgsaUJBQWlCO2NBUjdCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsaUJBQWlCO2lCQUNsQjthQUNGO3NDQWVtRCxpQkFBaUI7c0JBQXRELFFBQVE7O3NCQUFJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBOZ01vZHVsZSxcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgU29jaWFsQXV0aFNlcnZpY2UsIFNvY2lhbEF1dGhTZXJ2aWNlQ29uZmlnIH0gZnJvbSAnLi9zb2NpYWxhdXRoLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNvY2lhbEF1dGhTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU29jaWFsTG9naW5Nb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUoY29uZmlnOiBTb2NpYWxBdXRoU2VydmljZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U29jaWFsTG9naW5Nb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNvY2lhbExvZ2luTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFNvY2lhbEF1dGhTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ1NvY2lhbEF1dGhTZXJ2aWNlQ29uZmlnJyxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBTb2NpYWxMb2dpbk1vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1NvY2lhbExvZ2luTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG59XG4iXX0=