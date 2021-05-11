import { Component, OnInit } from '@angular/core';
import logoGmail from '@iconify/icons-logos/google-gmail';
import logoWhatsApp from '@iconify/icons-logos/whatsapp';
import logoTwitter from '@iconify/icons-logos/twitter';
import logoFacebook from '@iconify/icons-logos/facebook';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'vex-share-bottom-sheet',
  templateUrl: './share-bottom-sheet.component.html',
  styleUrls: ['./share-bottom-sheet.component.scss']
})
export class ShareBottomSheetComponent implements OnInit {

  logoGmail = logoGmail;
  logoWhatsApp = logoWhatsApp;
  logoTwitter = logoTwitter;
  logoFacebook = logoFacebook;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ShareBottomSheetComponent>) { }

  ngOnInit() {
  }

  close() {
    this._bottomSheetRef.dismiss();
  }
}
