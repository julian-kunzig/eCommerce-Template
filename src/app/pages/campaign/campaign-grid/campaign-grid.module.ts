import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignGridComponent } from './campaign-grid.component';
import { CampaignGridRoutingModule } from './campaign-grid-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { CampaignCardModule } from '../components/campaign-card/campaign-card.module';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
    declarations: [CampaignGridComponent],
    imports: [
        CommonModule,
        CampaignGridRoutingModule,
        CampaignCardModule,
        MatTabsModule,
        MatMenuModule,
        MatIconModule,
        MatSelectModule,
        IconModule,
        FlexLayoutModule,
        ContainerModule
    ]
})
export class CampaignGridModule {
}
