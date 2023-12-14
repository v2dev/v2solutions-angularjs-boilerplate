import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { matchValue } from '@app/shared/validators/match-value-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPassForm!: FormGroup;
  submitted: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.resetPassForm = this.fb.group({
      otp: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
      { validator: matchValue('password', 'confirmPassword') });
  }

  onSubmit() {
    this.submitted = true;
    this.authService.resetPassword(this.resetPassForm.value).subscribe(res => {
      if (res) {
        alert(res.message);
        this.submitted = false;
        this.router.navigate(['login']);
      }
    }, (error) => {
      this.submitted = false;
      console.error('Something went wrong:', error);
    })
  }

  get form() {
    return this.resetPassForm.controls;
  }
}
