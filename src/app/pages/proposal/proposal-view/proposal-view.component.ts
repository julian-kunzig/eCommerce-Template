import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {scaleIn400ms} from '../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../@vex/animations/fade-in-right.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {scaleFadeIn400ms} from '../../../../@vex/animations/scale-fade-in.animation';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignService, Proposal} from '../../../providers/campaign.service';
import {UserService} from '../../../providers/user.service';
import {Profile} from '../../campaign/interfaces/profile.interface';

@Component({
  selector: 'vex-proposal-view',
  templateUrl: './proposal-view.component.html',
  styleUrls: ['./proposal-view.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class ProposalViewComponent implements OnInit {
  proposal: Proposal;
  profile: Profile;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef,
              public campService: CampaignService,
              public userService: UserService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.proposal = this.campService.proposals.find( p => p.id === Number(id));
    this.profile = this.campService.profiles.find( p => p.id === this.proposal.userId);
  }

  ngOnInit(): void {
  }
  backList() {
    const r = this.router.navigate(['panel/offer/list'],
        { queryParams: { filter: 'all' } } );
  }
}
