import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import icSettings from '@iconify/icons-ic/twotone-settings';

@Component({
  selector: 'vex-config-panel-toggle',
  templateUrl: './config-panel-toggle.component.html',
  styleUrls: ['./config-panel-toggle.component.scss']
})
export class ConfigPanelToggleComponent implements OnInit {

  @Output() openConfig = new EventEmitter();

  icSettings = icSettings;

  constructor() { }

  ngOnInit() {
  }

}
