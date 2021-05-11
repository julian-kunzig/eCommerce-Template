import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vex-secondary-toolbar',
  templateUrl: './secondary-toolbar.component.html',
  styleUrls: ['./secondary-toolbar.component.scss']
})
export class SecondaryToolbarComponent implements OnInit {

  @Input() current: string;
  @Input() crumbs: string[];

  fixed$ = this.configService.config$.pipe(
    map(config => config.toolbar.fixed)
  );

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }
}
