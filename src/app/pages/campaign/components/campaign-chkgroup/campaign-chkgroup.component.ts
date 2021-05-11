import { Component, OnInit, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'vex-campaign-chkgroup',
  templateUrl: './campaign-chkgroup.component.html',
  styleUrls: ['./campaign-chkgroup.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CampaignChkgroupComponent),
      multi: true
    }
  ]
})
export class CampaignChkgroupComponent implements ControlValueAccessor {
  // @ts-ignore
  @Input() values = [];
  @Input() data: Array<any>;

  counter:number = 0;

  constructor() {
    
  }
  get Values() {
    return this.values;
  }
  propagateChange = (_: any) => {};

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}

  onChange(e) {
    this.counter = this.values.length;
    if (e.target.checked) {
      if(this.counter < 5){
        this.counter ++;
        this.values.push(e.target.value);
      }
      else {
        e.target.checked = false;
      }
    }else{
      const i: number = this.values.findIndex((elm) => elm === e.target.value);
      if (i !== -1) {
        this.values.splice(i, 1);
      }
      if(this.counter > 0) {
        this.counter --;
      }
    }
    this.propagateChange(this.values);
  }

  checkValue(val) {
    let i = -1;
    if (this.values !== undefined) {
       i = this.values.findIndex((elm) => elm === val);
    }
    return i !== -1;
  }
}
