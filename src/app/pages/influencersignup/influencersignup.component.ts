import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import {fadeInUp400ms} from '../../../@vex/animations/fade-in-up.animation';
import {UserService} from '../../providers/user.service';
import { DataService } from 'src/app/providers/data.service';
import { first } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { AuthenticationService } from 'src/app/providers/authentication.service';

@Component({
  selector: 'vex-influencersignup',
  templateUrl: './influencersignup.component.html',
  styleUrls: ['./influencersignup.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class InfluencerSignUpComponent implements OnInit {
  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  progressbar_visible = false;
  progressbar_value = 0;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              public userService: UserService,
              public dataService: DataService,
              private toastr: ToastrService,
              public _loadingBar: SlimLoadingBarService,
              public authService: AuthenticationService,
  ) {
    this._loadingBar.events.subscribe(items => {
      if(items.type == 0)
        this.progressbar_value = items.value;
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  send() {
    if(this.validateEmail(this.form.get('email').value)){
      if(this.form.get('email').value !== '' && this.form.get('password').value !== '' && this.form.get('first_name').value !== '' && this.form.get('last_name').value !== '')
      {
        this.progressbar_visible = true;
        this._loadingBar.start();

        const data = { 
          first_name: this.form.get('first_name').value,
          last_name: this.form.get('last_name').value,
          user : {
            email: this.form.get('email').value,
            password: this.form.get('password').value
          }          
        }
        this.dataService.createInfluencerAccount(data)
        .pipe(first())
        .subscribe((content:any) => {


          this.authService.login(this.form.get('email').value, this.form.get('password').value)
          .pipe()
          .subscribe(cdata => {

            this.userService.afterLogin('influencer');
            this.userService.currentUser.fullName = this.form.get('first_name').value + ' ' + this.form.get('last_name').value;
            this.userService.currentUser.email = this.form.get('email').value;

            this.userService.currentUser.profileId = content.profile_uuid;


            localStorage.setItem('type', 'influencer');
            this._loadingBar.complete();
            this.router.navigate(['/panel/user/setting']);
          })
          
          
        },
        error => {
          // console.log(error);
          this._loadingBar.complete();
          this.toastr.error('The email that you entered has been claimed by other users. Please use a different email or contact us at info@infinovae.com ','', {
            timeOut: 6000,
            positionClass: 'toast-bottom-right',
            progressBar: true
          });
        });
      }
      else
        this.snackbar.open('Please fill out all fields', 'Got It!', {
        duration: 10000});
    }
    else {
      this.snackbar.open('Please enter a valid email', 'Got It!', {
        duration: 10000});
    }
  
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase()))
    {
      return (true)
    }
    return false;
  }
  switchViewer(type) {
    this.userService.afterLogin(type);
    if(type !== '' && type !== 'brandsignup')
      this.router.navigate([type,'influencer']);
    else
      this.router.navigate([type]);
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

}
