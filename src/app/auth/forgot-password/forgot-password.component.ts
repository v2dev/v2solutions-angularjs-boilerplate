import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '@app/shared/validators/email-validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
    })
  }

  onSubmit() {
    const email = this.forgotPasswordForm.get('email')?.value;
    this.authService.forgotPassword(email).subscribe(res => {
      if (res) {
        alert(res.message);
        this.router.navigate(['reset-password']);
      }
    }, (error) => {
      console.error('Something went wrong:', error);
    })
  }

  get form() {
    return this.forgotPasswordForm.controls;
  }
}
