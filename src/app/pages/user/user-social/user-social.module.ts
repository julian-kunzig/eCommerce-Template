import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserSocialComponent} from './user-social.component';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {RouterModule} from '@angular/router';
import {MatRippleModule} from '@angular/material/core';

import { SocialLoginModule, SocialAuthServiceConfig } from '../../../../../dist/lib';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  InstagramLoginProvider
} from '../../../../../dist/lib';

import { FormsModule } from '@angular/forms';

import { ModalModule } from './_modal'
import { from } from 'rxjs';

import {MatRadioModule} from '@angular/material/radio';

const routes: VexRoutes = [
  {
    path: '',
    component: UserSocialComponent,
    data: {
      scrollDisabled: false,
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [UserSocialComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    MatRippleModule,
    RouterModule.forChild(routes),
    SocialLoginModule,
    FormsModule,
    ModalModule,
    MatRadioModule
  ],
  
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              // '624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com'
              '838544014217-o2j2pgttt004jket5svlmt6c3eija667.apps.googleusercontent.com'
              // '799995534608-goub4u0n4e3lt8nbl0hua4ccv2kdb9kq.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            //provider: new FacebookLoginProvider('561602290896109'),
            provider: new FacebookLoginProvider('693580448256916'), //infinove 693580448256916
            // provider: new FacebookLoginProvider('610851003050546'), //test
          },
          {
            id: InstagramLoginProvider.PROVIDER_ID,
            provider: new InstagramLoginProvider('693580448256916'), //infinovae
            // provider: new InstagramLoginProvider('610851003050546'), //test
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ],
})
export class UserSocialModule { }
