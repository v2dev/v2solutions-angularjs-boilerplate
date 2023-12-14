import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { emailValidator } from '@app/shared/validators/email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authenticator: boolean = false;
  submitted: boolean = false;
  user: string = '';
  showPassword: any;
  socialUser!: SocialUser;
  isLoggedin?: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService) {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.socialLogin();
  }

  socialLogin() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.loginForm.value).subscribe(res => {
      if (res) {
        this.user = this.loginForm.value.email;
        this.authenticator = true;
        this.submitted = false;
      }
    }, (error) => {
      this.submitted = false;
      console.error('Something went wrong:', error);
    })
  }

  get form() {
    return this.loginForm.controls
  }

}
