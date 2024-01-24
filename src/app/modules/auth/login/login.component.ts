import { Component } from '@angular/core';
import { AppKeys } from 'src/app/core/constants/appSettings';
import { EncryptStorageService } from 'src/app/core/services/encrypt-storage.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validators/email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;
  termsAndCondition = false;
  isChecked = false;
  displaySection: string = 'login';

  constructor(
    private formBuilder: FormBuilder,
    private readonly storageService: EncryptStorageService,
    private readonly authService: AuthService) {
    this.createForm();
    this.authService.isAuthorized.next(false);
    this.storageService.clearLocalStorageByKey(AppKeys.authToken);
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', Validators.required]
    });
  }

  get form() {
    return this.loginForm.controls
  }

  login() {
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.displaySection = 'otp';
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
      },
    });
  }
}
