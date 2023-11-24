import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPassForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.resetPassForm = this.fb.group({
      otp: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.resetPassword(this.resetPassForm.value).subscribe(res => {
      if (res) {
        alert(res.message);
        this.router.navigate(['login']);
      }
    }, (error) => {
      console.error('Something went wrong:', error);
    })
  }
}
