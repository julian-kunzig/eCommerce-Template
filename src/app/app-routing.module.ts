import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'signin/:id',
    
    loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninModule),
    data: {
      pageTitle: 'Signin',
    }
  },
  {
    path: 'brandsignup',
    loadChildren: () => import('./pages/brandsignup/brandsignup.module').then(m => m.BrandSignUpModule),
    data: {
      pageTitle: 'BrandSignUp',
    }
  },
  {
    path: 'influencersignup',
    loadChildren: () => import('./pages/influencersignup/influencersignup.module').then(m => m.InfluencerSignUpModule),
    data: {
      pageTitle: 'InfluencerSignUp',
    }
  },
  {
    path: 'panel',
    component: CustomLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          pageTitle: 'Dashboard',
        }
      },
      {
        path: 'campaign',
        loadChildren: () => import('./pages/campaign/campaign.module').then(m => m.CampaignModule),
        data: {
          pageTitle: 'Campaign',
        }
      },
      {
        path: 'inf_discover',
        loadChildren: () => import('./pages/campaign/influencer-grid/influencer-grid.module').then(m => m.InfluencerGridModule),
        data: {
          pageTitle: 'Discover',
        }
      },
      {
        path: 'discover',
        loadChildren: () => import('./pages/discover/discover.module').then(m => m.DiscoverModule),
        data: {
          pageTitle: 'Discover',
        }
      },
      {
        path: 'chat',
        loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule),
        data: {
          toolbarShadowEnabled: true,
          pageTitle: 'Chat',
        }
      },
      {
        path: 'proposal',
        loadChildren: () => import('./pages/proposal/proposal.module').then(m => m.ProposalModule),
        data: {
          toolbarShadowEnabled: true,
          pageTitle: 'Chat',
        }
      },
      {
        path: 'offer',
        loadChildren: () => import('./pages/offer/offer.module').then(m => m.OfferModule),
        data: {
          toolbarShadowEnabled: true,
          pageTitle: 'Offer',
        }
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
        data: {
          toolbarShadowEnabled: true,
          pageTitle: 'User',
        }
      },
      {
        path: 'system',
        loadChildren: () => import('./pages/system/system.module').then(m => m.SystemModule),
        data: {
          toolbarShadowEnabled: true,
          pageTitle: 'User',
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
