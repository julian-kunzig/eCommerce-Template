import {Component, SimpleChanges, Input, Output, forwardRef, OnChanges, EventEmitter} from '@angular/core';
import { Question } from '../../interfaces/question.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Campaign} from '../../interfaces/campaign.interface';

@Component({
  selector: 'vex-campaign-questgroup',
  templateUrl: './campaign-questgroup.component.html',
  styleUrls: ['./campaign-questgroup.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CampaignQuestgroupComponent),
      multi: true
    }
  ]
})
export class CampaignQuestgroupComponent implements ControlValueAccessor, OnChanges {
  @Input() values = [];
  @Input() ctrlName: string;
  @Input() data: Question[];
  @Output() setQuestion = new EventEmitter<string>();

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    if (this.values) {
      this.data.forEach(it => {
        const i = this.values.findIndex((elm) => elm === it.id);
        if (i !== -1) {
          it.completed = true;
        }
        if (it.sub_quetions) {
          it.sub_quetions.forEach(mt => {
            const m = this.values.findIndex((elm) => elm === mt.id);
            if (m !== -1) {
              mt.completed = true;
            }
          });
        }
      });
    }
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

  someComplete(qt: Question): boolean {
    if (qt.sub_quetions == null) {
      return false;
    }
    return qt.sub_quetions.filter(t => t.completed ).length > 0 && !qt.completed;
  }
  setValue(id, bflag) {
    // console.log('id, bFlage', id, bflag);
    // console.log('setvale',this.values);
    let i = -1;
    if (this.values) {
       i = this.values.findIndex((elm) => elm == id);
    }else {
      this.values = [];
    }
    if (bflag && i === -1) {
      this.values.pop();
      this.values.push(id);
      if (this.data.find(e => e.id === id)) {
        this.setQuestion.emit(this.data.find(e => e.id === id).question);
      }else{
        this.data.forEach(e => {
          if (e.sub_quetions && e.sub_quetions.find(s => s.id === id)) {
            this.setQuestion.emit(e.sub_quetions.find(s => s.id === id).question);
          }
        });
      }
    }
    
    if (i !== -1) {
      this.values.splice(i, 1);
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
  selectQuest(event) {
    const quest = this.data.find(e => e.id == event.target.value);
    this.setValue(Number(event.target.value), true);
    quest.completed = true;
    this.data.forEach(it => {
      if(it.id != event.target.value) {
        it.completed = false;
        if(it.sub_quetions != undefined) {
          it.sub_quetions.forEach(sit => {
            this.setValue(sit.id, false);
            sit.completed = false;
          })
        }
      }
      else {
        if(it.sub_quetions != undefined) {
          it.sub_quetions[0].completed = true;
          this.setValue(it.sub_quetions[0].id, true);
        }
      }
    })
  }
  setComplete(event, qt: Question) {
    qt.completed = event.checked;
    this.setValue(qt.id, event.checked);
    if (qt.sub_quetions !== undefined) {
      qt.sub_quetions.forEach(it => {
        it.completed = event.checked;
        this.setValue(it.id, event.checked);
      });
    }
    
    // this.data.forEach(it => {
    //   if(it.id != qt.id) {
    //     console.log('sub', qt);
    //     qt.completed = event.checked;
    //     this.setValue(qt.id, event.checked);
    //     console.log('sub1', qt);
    //     if (qt.sub_quetions !== undefined) {
    //       qt.sub_quetions.forEach(it => {
    //         it.completed = event.checked;
    //         this.setValue(it.id, event.checked);
    //       });
    //     }
    //   }
    // })
    

    // this.data.forEach(it => {
      
    //   if (it.sub_quetions) {
    //     console.log('sub', it);
    //     it.sub_quetions.findIndex((elem) => {
    //       if (elem.id === qt.id) {
    //         let bAll = true;
    //         it.sub_quetions.forEach(sit => {
    //           if (!sit.completed) {
    //             bAll = false;
    //           }
    //         });
    //         //it.completed = bAll;
    //         this.setValue(it.id, bAll);
    //       }
    //     });
    //   }
    // });
  }
}
