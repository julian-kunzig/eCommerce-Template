import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Profile} from '../../../campaign/interfaces/profile.interface';
import {CampaignService} from '../../../../providers/campaign.service';

@Component({
  selector: 'vex-discover-card',
  templateUrl: './discover-card.component.html',
  styleUrls: ['./discover-card.component.scss']
})
export class DiscoverCardComponent implements OnInit {
  @Input() profile: Profile;
  @Output() openProfile = new EventEmitter<Profile['id']>();
  @Output() goChat = new EventEmitter<Profile['id']>();
  @Output() saveMylist = new EventEmitter<Profile['id']>();
  @Output() saveFavorite = new EventEmitter<Profile['id']>();

  constructor(public campService: CampaignService) { }

  ngOnInit(): void {
  }

  translateFollowerLabel(value: number): string {
    const num = value / 1000;
    if (num.toString().split('.').length > 1) {
      return num.toFixed(1) +  'K';
    }else{
      return num + 'K';
    }
  }
}
