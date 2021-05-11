import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import icRemove from '@iconify/icons-ic/baseline-delete-forever';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'vex-campaign-imgupload',
  templateUrl: './campaign-imgupload.component.html',
  styleUrls: ['./campaign-imgupload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CampaignImguploadComponent),
      multi: true
    }
  ]
})
export class CampaignImguploadComponent implements ControlValueAccessor {
  constructor() { }

  @Input()
  imageSrc = '';
  icRemove = icRemove;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  get ImageSrc() {
    return this.imageSrc;
  }
  set ImageSrc(val) {
    this.imageSrc = val;
    this.propagateChange(this.imageSrc);
  }
  propagateChange = (_: any) => {};

  onFileChange(event) {
    const reader = new FileReader();
    const cf = event.currentTarget.parentNode.nextElementSibling;
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        // this.ImageSrc = reader.result as string;
      };

      this.imageChangedEvent = event;
      cf.classList.add('opened');
    }
  }
  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.imageSrc = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  onRemoveImage(event) {
    this.ImageSrc = '';
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  saveCroppedImage(event) {
    const parents = this.getParents(event.target, 'img-cropping-wrapper');
    this.ImageSrc = this.croppedImage;
    const cf = parents[parents.length - 1];
    cf.classList.remove('opened');
  }
  getParents(el, parentSelector) {
    if (parentSelector === undefined) {
      parentSelector = document;
    }
    const parents = [];
    let p = el.parentNode;
    while (!p.classList.contains(parentSelector)) {
      const o = p;
      parents.push(o);
      p = o.parentNode;
    }
    parents.push(p);
    return parents;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}
