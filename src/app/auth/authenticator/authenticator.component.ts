import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent {
  authenticatorForm!: FormGroup;
  @Input() imgUrl!: string;
  @Input() user!: string;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.authenticatorForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get form() {
    return this.authenticatorForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const otp = this.authenticatorForm.get('otp')?.value;
    const data = { email: this.user, mfaToken: otp }
    this.authService.verifyOtp(data).subscribe(res => {
      if (res) {
        this.submitted = false;
        this.authService.setToken(res.jwtToken);
        this.authService.loggedIn.next(true);
        this.router.navigate(['/home']);
      }
    }, (error) => {
      this.submitted = false;
      console.error('Something went wrong:', error);
    })
  }

}
