import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(email: HTMLInputElement) {
    this.authService.forgotPassword(email.value).subscribe(res => {
      if (res) {
        alert(res.message);
        this.router.navigate(['reset-password']);
      }
    }, (error) => {
      console.error('Something went wrong:', error);
    })
  }
}
