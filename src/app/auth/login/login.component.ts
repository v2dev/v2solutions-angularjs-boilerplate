import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { Subscription } from 'rxjs';

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
  routerSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(res => {
      if (res) {
        this.router.navigate(['home']);
      }
    })
    this.createForm();
    this.socialLogin();
  }

  socialLogin() {
    this.authService.socialLogin().subscribe(res => {
      if (res && res.success) {
        this.authService.setToken(res.jwtToken);
        this.authService.loggedIn.next(true);
        this.router.navigate(['/home']);
      }
    })
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(res => {
        if (res) {
          this.user = this.loginForm.value.email;
          this.authenticator = true;
          this.submitted = false;
        }
      }, (error) => {
        this.submitted = false;
        if (error?.error?.error) {
          alert(error.error.error)
        } else {
          console.error('Something went wrong:', error);
        }
      })
    }
  }

  get form() {
    return this.loginForm.controls
  }

}
