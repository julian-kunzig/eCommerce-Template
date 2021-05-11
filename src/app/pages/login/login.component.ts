import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import {fadeInUp400ms} from '../../../@vex/animations/fade-in-up.animation';
import {UserService} from '../../providers/user.service';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              public userService: UserService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  send() { // need to implement login functionality here
    /* Example of how to do it
    if(this.form.invalid){
      return;
    }
    this.authenticationService.login(this.form.controls.email.value, this.form.controls.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/']);;
                },
                error => {
                   console.log(error);
                });

     */
    this.router.navigate(['/']);
    this.snackbar.open('Lucky you! Looks like you didn\'t need a password or email address! For a real application we provide validators to prevent this. ;)', 'Got It!', {
      duration: 10000
    });
  }

  switchViewer(type) {
    this.userService.afterLogin(type);
    // console.log('switch');
    if(type == 'brand')
      this.router.navigate(['/signin', 'brand']);
    else if(type == 'influencer')
      this.router.navigate(['/signin', 'influencer']);
    else
      this.router.navigate(['/']);
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
