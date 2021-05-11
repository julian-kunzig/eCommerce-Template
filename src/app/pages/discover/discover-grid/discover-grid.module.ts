import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertDialogComponent, DiscoverGridComponent} from './discover-grid.component';
import {DiscoverGridRoutingModule} from './discover-grid-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { IconModule } from '@visurel/iconify-angular';
import {DiscoverCardModule} from '../components/discover-card/discover-card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Ng5SliderModule } from 'ng5-slider';
import {CampaignChkgroupModule} from '../../campaign/components/campaign-chkgroup/campaign-chkgroup.module';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ScrollbarModule} from '../../../../@vex/components/scrollbar/scrollbar.module';
import { MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [DiscoverGridComponent, AlertDialogComponent],
  imports: [
    CommonModule,
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
    DiscoverCardModule,
    MatTableModule,
    Ng5SliderModule,
    ScrollbarModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CampaignChkgroupModule,
    DiscoverGridRoutingModule
  ]
})
export class DiscoverGridModule { }
