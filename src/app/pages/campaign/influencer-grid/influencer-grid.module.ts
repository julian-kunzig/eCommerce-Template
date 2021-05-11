import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfluencerGridComponent } from './influencer-grid.component';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {RouterModule} from '@angular/router';
import {CampaignCardModule} from '../components/campaign-card/campaign-card.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {IconModule} from '@visurel/iconify-angular';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {Ng5SliderModule} from 'ng5-slider';
import {ScrollbarModule} from '../../../../@vex/components/scrollbar/scrollbar.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CampaignChkgroupModule} from '../components/campaign-chkgroup/campaign-chkgroup.module';

const routes: VexRoutes = [
  {
    path: 'list',
    component: InfluencerGridComponent,
    data: {
      scrollDisabled: false,
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  declarations: [InfluencerGridComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CampaignCardModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    ContainerModule,
    IconModule,
    MatTableModule,
    Ng5SliderModule,
    ScrollbarModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTooltipModule,
    CampaignChkgroupModule,
  ]
})
export class InfluencerGridModule { }
