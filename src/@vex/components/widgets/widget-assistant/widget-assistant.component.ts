import { Component, OnInit } from '@angular/core';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';

@Component({
  selector: 'vex-widget-assistant',
  templateUrl: './widget-assistant.component.html',
  styleUrls: ['./widget-assistant.component.scss']
})
export class WidgetAssistantComponent implements OnInit {

  icCheckCircle = icCheckCircle;

  constructor() { }

  ngOnInit() {
  }

}
