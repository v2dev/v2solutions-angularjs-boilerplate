import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authenticator: boolean = false;
  user: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(res => {
      if (res) {
        this.user = this.loginForm.value.email;
        this.authenticator = true;
      }
    }, (error) => {
      console.error('Something went wrong:', error);
    })
  }

}
