import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent {
  @Input() imgUrl!: string;
  @Input() user!: string;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(code: HTMLInputElement) {
    const data = { email: this.user, mfaToken: code.value }
    this.authService.verifyOtp(data).subscribe(res => {
      if (res) {
        localStorage.setItem('token', res.jwtToken);
        this.router.navigate(['/home'])
      }
    }, (error) => {
      console.error('Something went wrong:', error);
    })
  }

}
