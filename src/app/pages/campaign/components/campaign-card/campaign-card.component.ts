import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Campaign } from '../../interfaces/campaign.interface';
import {CampaignService} from '../../../../providers/campaign.service';
import {UserService} from '../../../../providers/user.service';
import icCheck from '@iconify/icons-ic/twotone-check';

@Component({
  selector: 'vex-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit {

  icCheck = icCheck;
  @Input() campaign: Campaign;
  @Output() addQueue = new EventEmitter<Campaign['id']>();
  @Output() openCampaign = new EventEmitter<Campaign['id']>();
  @Output() editCampaign = new EventEmitter<Campaign['id']>();
  @Output() saveArchive = new EventEmitter<Campaign['id']>();
  @Output() saveMylist = new EventEmitter<Campaign['id']>();
  @Output() deleteCampaign = new EventEmitter<Campaign['id']>();

  constructor(public campService: CampaignService,
              public userService: UserService) { }

  ngOnInit(): void {
  }
}
